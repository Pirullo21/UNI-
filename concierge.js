(() => {
    const cars = [
        ["porsche-911", "Porsche 911 Carrera", "Porsche 911 Carrera", "brand-porsche"],
        ["porsche-cayenne", "Porsche Cayenne", "Porsche Cayenne", "brand-porsche"],
        ["range-rover-sport", "Range Rover Sport", "Range Rover Sport", "brand-land-rover"],
        ["range-rover-velar", "Range Rover Velar P250 SE", "Range Rover Velar P250 SE", "brand-land-rover"],
        ["mercedes-s-class", "Mercedes-Benz Classe S", "Mercedes-Benz S-Class", "brand-mercedes"],
        ["mercedes-amg-gt-r", "Mercedes-AMG GT R", "Mercedes-AMG GT R", "brand-mercedes"]
    ];
    let language = localStorage.getItem("veloura-language") === "en" ? "en" : "it";

    const text = {
        it: {
            button: "Concierge", heading: "Concierge Veloura", status: "Assistente virtuale · non verifica disponibilità live",
            close: "Chiudi concierge", input: "Scrivi la tua richiesta…", send: "Invia",
            fleet: "La flotta", booking: "Prenotazioni", contact: "Contattaci",
            welcome: "Ciao, sono il concierge virtuale Veloura. Posso aiutarti a orientarti tra le auto, i colori e il flusso di richiesta. Non sono collegato a un operatore e non posso verificare disponibilità in tempo reale.",
            fleetAnswer: "La flotta è organizzata per marchio. Scegli un gruppo per esplorare i modelli:",
            availability: "Non posso controllare la disponibilità in tempo reale. Puoi scegliere date, città e colore nella pagina dell’auto, poi pagare in modo sicuro con Stripe. La ricevuta arriva via email dopo il pagamento; la disponibilità va confermata separatamente dal concierge.",
            bookingAnswer: "Apri la scheda dell’auto e scegli «Richiedi disponibilità» per selezionare date, città e colore. Il checkout Stripe addebita il totale mostrato e invia una ricevuta email solo dopo il pagamento riuscito. La disponibilità del veicolo va confermata separatamente dal concierge.",
            colorAnswer: "Nella pagina dedicata all’auto puoi scegliere un colore preferito. È una preferenza soggetta a conferma; le foto mostrano esemplari reali e potrebbero avere una tinta diversa.",
            help: "Per richieste particolari o problemi che richiedono assistenza, scrivi al nostro concierge. Questo prototipo non ha una connessione a un operatore.",
            fallback: "Posso aiutarti con la flotta, il pagamento e le prenotazioni, i colori o il contatto concierge. Non controllo disponibilità in tempo reale.",
            mail: "Scrivi al concierge", brands: ["Porsche", "Land Rover", "Mercedes-Benz"],
            brand: "Scopri", item: "Apri la scheda"
        },
        en: {
            button: "Concierge", heading: "Veloura Concierge", status: "Virtual assistant · no live availability checks",
            close: "Close concierge", input: "Type your request…", send: "Send",
            fleet: "Our fleet", booking: "Bookings", contact: "Contact us",
            welcome: "Hello, I'm Veloura's virtual concierge. I can guide you through our cars, colors and enquiry flow. I'm not connected to a human agent and can't check live availability.",
            fleetAnswer: "Our fleet is grouped by brand. Choose a group to explore the models:",
            availability: "I can't check live availability. Choose dates, city and color on a car's page, then pay securely with Stripe. A receipt is emailed after successful payment; vehicle availability must still be confirmed by the concierge.",
            bookingAnswer: "Open a car's page and select “Enquire about availability” to choose dates, city and color. Stripe Checkout charges the displayed total and emails a receipt only after successful payment. Vehicle availability must be confirmed separately by the concierge.",
            colorAnswer: "On each car's page you can choose a preferred color. It is subject to confirmation; photos show real examples and may have a different finish.",
            help: "For special requests or issues that need assistance, email our concierge. This prototype is not connected to a human agent.",
            fallback: "I can help with the fleet, payments and bookings, colors or contacting the concierge. I can't check live availability.",
            mail: "Email the concierge", brands: ["Porsche", "Land Rover", "Mercedes-Benz"],
            brand: "Explore", item: "View car"
        }
    };

    const widget = document.createElement("div");
    widget.className = "concierge-widget";
    widget.innerHTML = `
        <section class="concierge-panel" id="concierge-panel" aria-labelledby="concierge-heading" hidden>
            <header class="concierge-header">
                <div><h2 class="concierge-heading" id="concierge-heading"></h2><span class="concierge-status"></span></div>
                <button class="concierge-close" type="button" aria-label=""></button>
            </header>
            <div class="concierge-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
            <nav class="concierge-quick-actions" aria-label="Quick actions"></nav>
            <form class="concierge-form">
                <input class="concierge-input" type="text" autocomplete="off" maxlength="500" required>
                <button class="concierge-send" type="submit"></button>
            </form>
        </section>
        <button class="concierge-toggle" type="button" aria-expanded="false" aria-controls="concierge-panel"></button>`;
    document.body.append(widget);

    const panel = widget.querySelector(".concierge-panel");
    const toggle = widget.querySelector(".concierge-toggle");
    const close = widget.querySelector(".concierge-close");
    const messages = widget.querySelector(".concierge-messages");
    const quickActions = widget.querySelector(".concierge-quick-actions");
    const form = widget.querySelector(".concierge-form");
    const input = widget.querySelector(".concierge-input");
    let welcomed = false;

    function addMessage(message, isUser = false, links = []) {
        const bubble = document.createElement("div");
        bubble.className = `concierge-message${isUser ? " user" : ""}`;
        bubble.textContent = message;
        links.forEach(({ label, href }) => {
            const link = document.createElement("a");
            link.href = href;
            link.textContent = label;
            if (/^https?:/.test(href)) {
                link.target = "_blank";
                link.rel = "noopener";
            }
            bubble.append(document.createElement("br"), link);
        });
        messages.append(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    function groupLinks() {
        const labels = text[language].brands;
        return [
            { label: labels[0], href: "index.html#brand-porsche" },
            { label: labels[1], href: "index.html#brand-land-rover" },
            { label: labels[2], href: "index.html#brand-mercedes" }
        ];
    }

    function setLanguage(nextLanguage) {
        language = nextLanguage === "en" ? "en" : "it";
        const copy = text[language];
        toggle.textContent = copy.button;
        toggle.setAttribute("aria-label", copy.button);
        widget.querySelector(".concierge-heading").textContent = copy.heading;
        widget.querySelector(".concierge-status").textContent = copy.status;
        close.textContent = "×";
        close.setAttribute("aria-label", copy.close);
        input.placeholder = copy.input;
        input.setAttribute("aria-label", copy.input);
        widget.querySelector(".concierge-send").textContent = copy.send;
        quickActions.setAttribute("aria-label", language === "it" ? "Azioni rapide" : "Quick actions");
        quickActions.replaceChildren();
        [
            [copy.fleet, () => addMessage(copy.fleetAnswer, false, groupLinks())],
            [copy.booking, () => addMessage(copy.bookingAnswer)],
            [copy.contact, () => addMessage(copy.help, false, [{ label: copy.mail, href: "mailto:concierge@veloura.it" }])]
        ].forEach(([label, action]) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = label;
            button.addEventListener("click", action);
            quickActions.append(button);
        });
        if (welcomed && messages.childElementCount === 0) addMessage(copy.welcome);
    }

    function answer(question) {
        const query = question.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const copy = text[language];
        if (/(disponibil|availability|liber[ae]|available|prezzo|price|costo|cost|tariff)/.test(query)) {
            return { message: copy.availability, links: [{ label: copy.mail, href: "mailto:concierge@veloura.it" }] };
        }
        if (/(prenot|booking|reservation|date|data|richiest|enquir|rent|nolegg)/.test(query)) return { message: copy.bookingAnswer };
        if (/(color|colore|vernice|paint)/.test(query)) return { message: copy.colorAnswer };
        if (/(proble|aiut|help|assisten|support|special|particolar|operatore|human|contact|contatt|email)/.test(query)) {
            return { message: copy.help, links: [{ label: copy.mail, href: "mailto:concierge@veloura.it" }] };
        }
        const make = cars.find(([, it, en]) => query.includes(it.toLocaleLowerCase()) || query.includes(en.toLocaleLowerCase()));
        if (make) return { message: `${copy.item}: ${language === "it" ? make[1] : make[2]}.`, links: [{ label: copy.item, href: `vehicle.html?car=${make[0]}` }] };
        if (/(flott|auto|macchin|car|vehicle|brand|marchio|porsche|rover|mercedes|amg)/.test(query)) {
            return { message: copy.fleetAnswer, links: groupLinks() };
        }
        return { message: copy.fallback };
    }

    function submit(question) {
        const trimmed = question.trim();
        if (!trimmed) return;
        addMessage(trimmed, true);
        const response = answer(trimmed);
        addMessage(response.message, false, response.links || []);
    }

    toggle.addEventListener("click", () => {
        const isOpen = panel.hidden;
        panel.hidden = !isOpen;
        toggle.setAttribute("aria-expanded", String(isOpen));
        if (isOpen && !welcomed) {
            addMessage(text[language].welcome);
            welcomed = true;
        }
        if (isOpen) input.focus();
    });
    close.addEventListener("click", () => {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        submit(input.value);
        input.value = "";
        input.focus();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !panel.hidden) {
            panel.hidden = true;
            toggle.setAttribute("aria-expanded", "false");
            toggle.focus();
        }
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
        button.addEventListener("click", () => setLanguage(button.dataset.language));
    });
    setLanguage(language);
})();
