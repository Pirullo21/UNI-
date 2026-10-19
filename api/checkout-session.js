const Stripe = require("stripe");
const catalog = require("../vehicle-catalog");

module.exports = async function getCheckoutSession(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed." });
    if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: "Payments are not configured yet." });

    const sessionId = typeof req.query.session_id === "string" ? req.query.session_id : "";
    if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
        return res.status(400).json({ error: "A valid checkout session is required." });
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== "paid") {
            return res.status(200).json({ paid: false });
        }

        const metadata = session.metadata || {};
        const total = session.amount_total;
        const receiptEmail = session.customer_details?.email || session.customer_email || "";
        if (!metadata.bookingReference || !vehicles.has(metadata.carId) || !Number.isSafeInteger(total)
            || session.mode !== "payment" || session.currency !== "eur"
            || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiptEmail)) {
            return res.status(502).json({ error: "The paid booking details could not be verified." });
        }
        const vehicle = vehicles.get(metadata.carId);
        const duration = Number(metadata.duration);
        if (!Number.isInteger(duration) || duration < 1
            || !isIsoDate(metadata.pickup) || !isIsoDate(metadata.return)
            || metadata.return <= metadata.pickup
            || !locations.has(metadata.location) || !vehicle.colors.includes(metadata.color)
            || duration !== (Date.parse(`${metadata.return}T00:00:00.000Z`) - Date.parse(`${metadata.pickup}T00:00:00.000Z`)) / 86400000
            || total !== vehicle.price * 100 * duration) {
            return res.status(502).json({ error: "The paid booking details could not be verified." });
        }

        return res.status(200).json({
            paid: true,
            booking: {
                reference: metadata.bookingReference,
                carId: metadata.carId,
                pickup: metadata.pickup,
                return: metadata.return,
                location: metadata.location,
                color: metadata.color,
                duration,
                total: total / 100,
                name: metadata.customerName || "",
                email: receiptEmail,
                phone: metadata.customerPhone || "",
                notes: metadata.notes || "",
                createdAt: new Date(session.created * 1000).toISOString(),
                paymentStatus: "paid"
            }
        });
    } catch (error) {
        console.error("Stripe Checkout session verification failed:", error.message);
        return res.status(502).json({ error: "We could not verify the payment yet. Please try again shortly." });
    }
};

const vehicles = new Map([
    ["porsche-911", { price: 490, colors: ["white", "black", "red", "blue"] }],
    ["range-rover-sport", { price: 390, colors: ["white", "black", "grey", "blue"] }],
    ["porsche-cayenne", { price: 420, colors: ["white", "black", "grey", "blue"] }],
    ["range-rover-velar", { price: 350, colors: ["white", "black", "grey", "green"] }],
    ["mercedes-amg-gt-r", { price: 690, colors: ["green", "black", "grey", "red"] }],
    ["mercedes-s-class", { price: 520, colors: ["white", "black", "silver", "blue"] }],
    ...catalog.map((vehicle) => [vehicle.id, {
        price: vehicle.price,
        colors: vehicle.colors.map((color) => color.id)
    }])
]);
const locations = new Set(["Milano", "Roma", "Firenze", "Venezia"]);

function isIsoDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const timestamp = Date.parse(`${value}T00:00:00.000Z`);
    return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value;
}
