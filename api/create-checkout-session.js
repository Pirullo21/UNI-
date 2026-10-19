const Stripe = require("stripe");
const { randomUUID } = require("node:crypto");
const catalog = require("../vehicle-catalog");

const vehicles = {
    "porsche-911": { name: { it: "Porsche 911 Carrera", en: "Porsche 911 Carrera" }, price: 490, colors: ["white", "black", "red", "blue"] },
    "range-rover-sport": { name: { it: "Range Rover Sport", en: "Range Rover Sport" }, price: 390, colors: ["white", "black", "grey", "blue"] },
    "porsche-cayenne": { name: { it: "Porsche Cayenne", en: "Porsche Cayenne" }, price: 420, colors: ["white", "black", "grey", "blue"] },
    "range-rover-velar": { name: { it: "Range Rover Velar P250 SE", en: "Range Rover Velar P250 SE" }, price: 350, colors: ["white", "black", "grey", "green"] },
    "mercedes-amg-gt-r": { name: { it: "Mercedes-AMG GT R", en: "Mercedes-AMG GT R" }, price: 690, colors: ["green", "black", "grey", "red"] },
    "mercedes-s-class": { name: { it: "Mercedes-Benz Classe S", en: "Mercedes-Benz S-Class" }, price: 520, colors: ["white", "black", "silver", "blue"] }
};
for (const vehicle of catalog) {
    vehicles[vehicle.id] = {
        name: vehicle.name,
        price: vehicle.price,
        colors: vehicle.colors.map((color) => color.id)
    };
}
const locations = new Set(["Milano", "Roma", "Firenze", "Venezia"]);

function respond(res, status, body) {
    return res.status(status).json(body);
}

function isIsoDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const timestamp = Date.parse(`${value}T00:00:00.000Z`);
    return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value;
}

function todayInRome() {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Rome",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(new Date()).reduce((date, part) => {
        if (part.type !== "literal") date[part.type] = part.value;
        return date;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}`;
}

module.exports = async function createCheckoutSession(req, res) {
    if (req.method !== "POST") return respond(res, 405, { error: "Method not allowed." });
    if (!process.env.STRIPE_SECRET_KEY) return respond(res, 503, { error: "Payments are not configured yet." });
    if (!process.env.APP_URL && !process.env.VERCEL_URL) {
        return respond(res, 503, { error: "The public site URL is not configured yet." });
    }

    const { carId, pickup, return: dropoff, location, color, name, email, phone, notes, language } = req.body || {};
    const vehicle = vehicles[carId];
    if (!vehicle) return respond(res, 400, { error: "Choose a valid vehicle." });
    if (language !== "it" && language !== "en") return respond(res, 400, { error: "Choose a valid language." });
    if (!isIsoDate(pickup) || pickup < todayInRome() || !isIsoDate(dropoff) || dropoff <= pickup) {
        return respond(res, 400, { error: "Choose valid future rental dates." });
    }
    if (!locations.has(location) || !vehicle.colors.includes(color)) {
        return respond(res, 400, { error: "Choose a valid pick-up location and vehicle color." });
    }
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
        return respond(res, 400, { error: "Enter a valid full name." });
    }
    if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return respond(res, 400, { error: "Enter a valid email address." });
    }
    if (typeof phone !== "string" || phone.trim().length < 5 || phone.length > 30) {
        return respond(res, 400, { error: "Enter a valid phone number." });
    }
    if (notes !== undefined && (typeof notes !== "string" || notes.length > 500)) {
        return respond(res, 400, { error: "Booking notes are too long." });
    }

    const duration = (Date.parse(`${dropoff}T00:00:00.000Z`) - Date.parse(`${pickup}T00:00:00.000Z`)) / 86400000;
    const baseUrl = process.env.APP_URL
        ? process.env.APP_URL.replace(/\/+$/, "")
        : `https://${process.env.VERCEL_URL}`;
    let appUrl;
    try {
        appUrl = new URL(baseUrl);
    } catch {
        return respond(res, 503, { error: "The public site URL is invalid." });
    }
    if (appUrl.protocol !== "https:" && appUrl.hostname !== "localhost") {
        return respond(res, 503, { error: "The public site URL must use HTTPS." });
    }

    const bookingReference = `VL-${randomUUID().slice(0, 8).toUpperCase()}`;
    const successUrl = new URL("/reservation.html", appUrl);
    successUrl.searchParams.set("car", carId);
    successUrl.searchParams.set("payment", "success");
    successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
    const cancelUrl = new URL("/reservation.html", appUrl);
    cancelUrl.searchParams.set("car", carId);
    cancelUrl.searchParams.set("payment", "cancelled");

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            customer_email: email.trim(),
            payment_method_types: ["card"],
            line_items: [{
                quantity: 1,
                price_data: {
                    currency: "eur",
                    unit_amount: vehicle.price * 100 * duration,
                    product_data: {
                        name: `${vehicle.name[language]} · ${duration} ${language === "it" ? (duration === 1 ? "giorno" : "giorni") : `day${duration === 1 ? "" : "s"}`}`,
                        description: `Pick-up: ${pickup} · Return: ${dropoff} · ${location} · Preferred color: ${color}`
                    }
                }
            }],
            metadata: {
                bookingReference,
                carId,
                pickup,
                return: dropoff,
                location,
                color,
                duration: String(duration),
                customerName: name.trim().slice(0, 100),
                customerPhone: phone.trim().slice(0, 30),
                notes: (notes || "").trim()
            },
            success_url: successUrl.toString().replace("%7BCHECKOUT_SESSION_ID%7D", "{CHECKOUT_SESSION_ID}"),
            cancel_url: cancelUrl.toString(),
            locale: "auto"
        }, { idempotencyKey: randomUUID() });

        return respond(res, 200, { url: session.url });
    } catch (error) {
        console.error("Stripe Checkout session creation failed:", error.message);
        return respond(res, 502, { error: "We could not start secure checkout. Please try again shortly." });
    }
};
