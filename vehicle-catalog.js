(function (root, factory) {
    const catalog = factory();
    if (typeof module === "object" && module.exports) module.exports = catalog;
    else root.VELOURA_CATALOG = catalog;
})(globalThis, function () {
    const colorSets = {
        sport: [
            { id: "white", hex: "#e9e7df", name: { it: "Bianco", en: "White" } },
            { id: "black", hex: "#20211f", name: { it: "Nero", en: "Black" } },
            { id: "red", hex: "#a51d2d", name: { it: "Rosso", en: "Red" } },
            { id: "blue", hex: "#1684d5", name: { it: "Blu", en: "Blue" } }
        ],
        suv: [
            { id: "white", hex: "#e9e7df", name: { it: "Bianco", en: "White" } },
            { id: "black", hex: "#20211f", name: { it: "Nero", en: "Black" } },
            { id: "grey", hex: "#777973", name: { it: "Grigio", en: "Grey" } },
            { id: "green", hex: "#4e594c", name: { it: "Verde", en: "Green" } }
        ],
        elegance: [
            { id: "white", hex: "#e9e7df", name: { it: "Bianco", en: "White" } },
            { id: "black", hex: "#20211f", name: { it: "Nero", en: "Black" } },
            { id: "silver", hex: "#a6a8aa", name: { it: "Argento", en: "Silver" } },
            { id: "blue", hex: "#283b54", name: { it: "Blu", en: "Blue" } }
        ]
    };
    const licenseUrls = {
        "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
        "CC0 1.0": "https://creativecommons.org/publicdomain/zero/1.0/",
        "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
        "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
        "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
        "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
        "GFDL 1.2": "https://www.gnu.org/licenses/old-licenses/fdl-1.2.html"
    };

    function createVehicle(data) {
        const category = {
            sport: { it: "Sportiva", en: "Sports car" },
            suv: { it: "SUV di lusso", en: "Luxury SUV" },
            elegance: { it: "Eleganza", en: "Luxury saloon" }
        }[data.class];
        const makeImage = (photo) => {
            const licenseUrl = licenseUrls[photo.license];
            if (!licenseUrl) throw new Error(`Unsupported image license: ${photo.license}`);
            return {
                src: photo.src,
                alt: { it: photo.altIt, en: photo.altEn },
                author: photo.author,
                license: photo.license,
                licenseUrl,
                source: photo.source
            };
        };
        const image = makeImage({
            src: data.image,
            altIt: data.altIt,
            altEn: data.altEn,
            author: data.author,
            license: data.license,
            source: data.source
        });

        return {
            ...data,
            photoSource: data.source,
            photoAuthor: data.author,
            category,
            colors: colorSets[data.class].map((color) => ({ ...color, name: { ...color.name } })),
            tagline: { it: data.taglineIt, en: data.taglineEn },
            description: { it: data.descriptionIt, en: data.descriptionEn },
            images: [image, ...(data.additionalImages || []).map(makeImage)],
            hero: data.image,
            heroCredit: data.author,
            heroLicense: data.license,
            heroSource: data.source
        };
    }

    return [
        createVehicle({
            id: "ferrari-f8-tributo", brand: "Ferrari", name: { it: "Ferrari F8 Tributo", en: "Ferrari F8 Tributo" },
            class: "sport", price: 790, photoYear: 2019, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Ferrari_F8_Tributo%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS1318%29.jpg/960px-Ferrari_F8_Tributo%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS1318%29.jpg",
            source: "https://commons.wikimedia.org/wiki/File:Ferrari_F8_Tributo,_GIMS_2019,_Le_Grand-Saconnex_(GIMS1318).jpg", author: "Matti Blume", license: "CC BY-SA 4.0",
            altIt: "Ferrari F8 Tributo al Salone di Ginevra 2019", altEn: "Ferrari F8 Tributo at the 2019 Geneva Motor Show",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Ferrari_F8_Tributo%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS1319%29.jpg/960px-Ferrari_F8_Tributo%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS1319%29.jpg", source: "https://commons.wikimedia.org/wiki/File:Ferrari_F8_Tributo,_GIMS_2019,_Le_Grand-Saconnex_(GIMS1319).jpg", author: "Matti Blume", license: "CC BY-SA 4.0", altIt: "Seconda vista della Ferrari F8 Tributo al Salone di Ginevra 2019", altEn: "Second view of the Ferrari F8 Tributo at the 2019 Geneva Motor Show" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Ferrari_F8_Tributo_DSC_7013.jpg/960px-Ferrari_F8_Tributo_DSC_7013.jpg", source: "https://commons.wikimedia.org/wiki/File:Ferrari_F8_Tributo_DSC_7013.jpg", author: "Alexander Migl", license: "CC BY-SA 4.0", altIt: "Ferrari F8 Tributo fotografata da Alexander Migl", altEn: "Ferrari F8 Tributo photographed by Alexander Migl" }
            ],
            taglineIt: "Potenza e precisione, in una forma inconfondibile.", taglineEn: "Power and precision in an unmistakable form.",
            descriptionIt: "La F8 Tributo celebra il motore V8 Ferrari con prestazioni da supercar e una guida pensata per chi ama la strada.",
            descriptionEn: "The F8 Tributo celebrates Ferrari's V8 heritage with supercar performance and a driving experience made for the open road.",
            specs: [["engine", "3.9 L V8 biturbo", "3.9 L twin-turbo V8"], ["power", "720 CV", "710 hp"], ["acceleration", "2,9 s · 0–100 km/h", "2.9 s · 0–62 mph"], ["topSpeed", "340 km/h", "211 mph"], ["transmission", "Cambio doppia frizione a 7 rapporti", "7-speed dual-clutch transmission"], ["seats", "2 posti", "2 seats"], ["luggage", "200 L", "200 L"], ["drive", "Trazione posteriore", "Rear-wheel drive"]]
        }),
        createVehicle({
            id: "lamborghini-huracan-evo", brand: "Lamborghini", name: { it: "Lamborghini Huracán EVO RWD", en: "Lamborghini Huracán EVO RWD" },
            class: "sport", price: 760, photoYear: 2020, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/2020_Lamborghini_Huracan_EVO_RWD.jpg/960px-2020_Lamborghini_Huracan_EVO_RWD.jpg",
            source: "https://commons.wikimedia.org/wiki/File:2020_Lamborghini_Huracan_EVO_RWD.jpg", author: "MrWalkr", license: "CC BY-SA 4.0",
            altIt: "Lamborghini Huracán EVO RWD del 2020", altEn: "2020 Lamborghini Huracán EVO RWD",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/2020-giallo-inti-lamborghini-huracan-evo-coupe-rwd_50490830952_o.jpg/960px-2020-giallo-inti-lamborghini-huracan-evo-coupe-rwd_50490830952_o.jpg", source: "https://commons.wikimedia.org/wiki/File:2020-giallo-inti-lamborghini-huracan-evo-coupe-rwd_50490830952_o.jpg", author: "Tabascogiuseppe1960", license: "CC BY-SA 4.0", altIt: "Lamborghini Huracán EVO Coupé RWD 2020, vista esterna", altEn: "2020 Lamborghini Huracán EVO Coupe RWD, exterior view" }
            ],
            taglineIt: "Un V10 aspirato, senza filtri.", taglineEn: "A naturally aspirated V10, without filters.",
            descriptionIt: "La Huracán EVO RWD mette al centro il coinvolgimento di guida: motore V10 aspirato, assetto sportivo e trazione posteriore.",
            descriptionEn: "The Huracán EVO RWD puts driver engagement first, pairing a naturally aspirated V10 with a sporting chassis and rear-wheel drive.",
            specs: [["engine", "5.2 L V10 aspirato", "5.2 L naturally aspirated V10"], ["power", "610 CV", "602 hp"], ["acceleration", "3,3 s · 0–100 km/h", "3.3 s · 0–62 mph"], ["topSpeed", "325 km/h", "202 mph"], ["transmission", "Doppia frizione LDF a 7 rapporti", "7-speed LDF dual-clutch"], ["seats", "2 posti", "2 seats"], ["luggage", "100 L", "100 L"], ["drive", "Trazione posteriore", "Rear-wheel drive"]]
        }),
        createVehicle({
            id: "mclaren-720s", brand: "McLaren", name: { it: "McLaren 720S", en: "McLaren 720S" },
            class: "sport", price: 740, photoYear: 2018, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/2018_McLaren_720S_V8_S-A_4.0.jpg/960px-2018_McLaren_720S_V8_S-A_4.0.jpg",
            source: "https://commons.wikimedia.org/w/index.php?curid=85850985", author: "Vauxford", license: "CC BY-SA 4.0",
            altIt: "McLaren 720S 2018, vista anteriore a tre quarti", altEn: "2018 McLaren 720S, front three-quarter view",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/McLaren_720S_%282018%29_%2852228246608%29.jpg/960px-McLaren_720S_%282018%29_%2852228246608%29.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=123208643", author: "Charles from Port Chester, New York", license: "CC BY 2.0", altIt: "McLaren 720S 2018, vista laterale", altEn: "2018 McLaren 720S, side view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/McLaren_720S_%282018%29_%2852228246633%29.jpg/960px-McLaren_720S_%282018%29_%2852228246633%29.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=121338558", author: "Charles from Port Chester, New York", license: "CC BY 2.0", altIt: "McLaren 720S 2018, vista posteriore", altEn: "2018 McLaren 720S, rear view" }
            ],
            taglineIt: "Ingegneria leggera, emozioni immense.", taglineEn: "Lightweight engineering, extraordinary thrills.",
            descriptionIt: "La McLaren 720S combina una struttura in fibra di carbonio con un V8 biturbo centrale e prestazioni da pista.",
            descriptionEn: "The McLaren 720S combines a carbon-fibre structure with a mid-mounted twin-turbo V8 and track-ready performance.",
            specs: [["engine", "4.0 L V8 biturbo", "4.0 L twin-turbo V8"], ["power", "720 CV", "710 hp"], ["acceleration", "2,9 s · 0–100 km/h", "2.9 s · 0–62 mph"], ["topSpeed", "341 km/h", "212 mph"], ["transmission", "SSG a doppia frizione, 7 rapporti", "7-speed SSG dual-clutch"], ["seats", "2 posti", "2 seats"], ["luggage", "150 L", "150 L"], ["drive", "Trazione posteriore", "Rear-wheel drive"]]
        }),
        createVehicle({
            id: "aston-martin-vantage", brand: "Aston Martin", name: { it: "Aston Martin Vantage V8", en: "Aston Martin Vantage V8" },
            class: "sport", price: 680, photoYear: 2019, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/2019_Aston_Martin_Vantage_V8_Automatic_4.0_%281%29.jpg/960px-2019_Aston_Martin_Vantage_V8_Automatic_4.0_%281%29.jpg",
            source: "https://commons.wikimedia.org/wiki/File:2019_Aston_Martin_Vantage_V8_Automatic_4.0_(1).jpg", author: "Vauxford", license: "CC BY-SA 4.0",
            altIt: "Aston Martin Vantage V8 del 2019", altEn: "2019 Aston Martin Vantage V8",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/2019_Aston_Martin_Vantage_V8_Automatic_4.0_Front.jpg/960px-2019_Aston_Martin_Vantage_V8_Automatic_4.0_Front.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=81796860", author: "Vauxford", license: "CC BY-SA 4.0", altIt: "Aston Martin Vantage V8 2019, vista anteriore", altEn: "2019 Aston Martin Vantage V8, front view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/2019_Aston_Martin_V8_Vantage_Interior_4.0.jpg/960px-2019_Aston_Martin_V8_Vantage_Interior_4.0.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=81796842", author: "Vauxford", license: "CC BY-SA 4.0", altIt: "Abitacolo dell’Aston Martin Vantage V8 2019", altEn: "2019 Aston Martin Vantage V8 interior" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/2019_Aston_Martin_Vantage_V8_Automatic_4.0_Rear.jpg/960px-2019_Aston_Martin_Vantage_V8_Automatic_4.0_Rear.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=81796861", author: "Vauxford", license: "CC BY-SA 4.0", altIt: "Aston Martin Vantage V8 2019, vista posteriore", altEn: "2019 Aston Martin Vantage V8, rear view" }
            ],
            taglineIt: "Eleganza britannica, carattere sportivo.", taglineEn: "British elegance with a sporting edge.",
            descriptionIt: "La Vantage abbina proporzioni da gran turismo a un V8 biturbo e a una configurazione a trazione posteriore.",
            descriptionEn: "The Vantage pairs grand-touring proportions with a twin-turbo V8 and a rear-wheel-drive layout.",
            specs: [["engine", "4.0 L V8 biturbo", "4.0 L twin-turbo V8"], ["power", "510 CV", "503 hp"], ["acceleration", "3,6 s · 0–100 km/h", "3.6 s · 0–62 mph"], ["topSpeed", "314 km/h", "195 mph"], ["transmission", "Automatica ZF a 8 rapporti", "8-speed ZF automatic"], ["seats", "2 posti", "2 seats"], ["luggage", "350 L", "350 L"], ["drive", "Trazione posteriore", "Rear-wheel drive"]]
        }),
        createVehicle({
            id: "audi-r8-v10", brand: "Audi", name: { it: "Audi R8 V10 plus", en: "Audi R8 V10 plus" },
            class: "sport", price: 650, photoYear: 2018, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/2018_Audi_R8_Coupe_V10_plus_Front.jpg/960px-2018_Audi_R8_Coupe_V10_plus_Front.jpg",
            source: "https://commons.wikimedia.org/wiki/File:2018_Audi_R8_Coupe_V10_plus_Front.jpg", author: "Vauxford", license: "CC BY-SA 4.0",
            altIt: "Audi R8 Coupé V10 plus del 2018", altEn: "2018 Audi R8 Coupe V10 plus",
            additionalImages: [
                { src: "https://upload.wikimedia.org/wikipedia/commons/2/29/2018_Audi_R8_Coupe_V10_plus_Rear.jpg", source: "https://commons.wikimedia.org/wiki/File:2018_Audi_R8_Coupe_V10_plus_Rear.jpg", author: "Vauxford", license: "CC BY-SA 4.0", altIt: "Audi R8 Coupé V10 plus del 2018, vista posteriore", altEn: "2018 Audi R8 Coupe V10 plus, rear view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Audi_R8_V10_Plus_%282018%29_%2853461428551%29.jpg/960px-Audi_R8_V10_Plus_%282018%29_%2853461428551%29.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=179227748", author: "Charles from Port Chester, New York", license: "CC BY 2.0", altIt: "Audi R8 V10 plus 2018, vista esterna laterale", altEn: "2018 Audi R8 V10 plus, side exterior view" }
            ],
            taglineIt: "Il V10 Audi, al centro dell’esperienza.", taglineEn: "Audi's V10 at the heart of the experience.",
            descriptionIt: "La R8 V10 plus porta la tecnologia delle competizioni su strada con un V10 aspirato e trazione quattro.",
            descriptionEn: "The R8 V10 plus brings motorsport engineering to the road with a naturally aspirated V10 and quattro all-wheel drive.",
            specs: [["engine", "5.2 L V10 aspirato", "5.2 L naturally aspirated V10"], ["power", "610 CV", "602 hp"], ["acceleration", "3,2 s · 0–100 km/h", "3.2 s · 0–62 mph"], ["topSpeed", "330 km/h", "205 mph"], ["transmission", "S tronic a doppia frizione, 7 rapporti", "7-speed S tronic dual-clutch"], ["seats", "2 posti", "2 seats"], ["luggage", "112 L", "112 L"], ["drive", "Trazione integrale quattro", "quattro all-wheel drive"]]
        }),
        createVehicle({
            id: "lamborghini-urus", brand: "Lamborghini", name: { it: "Lamborghini Urus Performante", en: "Lamborghini Urus Performante" },
            class: "suv", price: 790, photoYear: 2023, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Lamborghini_Urus_Performante_1X7A6805.jpg/960px-Lamborghini_Urus_Performante_1X7A6805.jpg",
            source: "https://commons.wikimedia.org/wiki/File:Lamborghini_Urus_Performante_1X7A6805.jpg", author: "Alexander-93", license: "CC BY-SA 4.0",
            altIt: "Lamborghini Urus Performante", altEn: "Lamborghini Urus Performante",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Lamborghini_Urus_Performante_1X7A6803.jpg/960px-Lamborghini_Urus_Performante_1X7A6803.jpg", source: "https://commons.wikimedia.org/wiki/File:Lamborghini_Urus_Performante_1X7A6803.jpg", author: "Alexander-93", license: "CC BY-SA 4.0", altIt: "Lamborghini Urus Performante, vista anteriore", altEn: "Lamborghini Urus Performante, front view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Lamborghini_Urus_Performante_1X7A6804.jpg/960px-Lamborghini_Urus_Performante_1X7A6804.jpg", source: "https://commons.wikimedia.org/wiki/File:Lamborghini_Urus_Performante_1X7A6804.jpg", author: "Alexander-93", license: "CC BY-SA 4.0", altIt: "Lamborghini Urus Performante, vista laterale", altEn: "Lamborghini Urus Performante, side view" }
            ],
            taglineIt: "L’anima di una supercar, con spazio per tutti.", taglineEn: "Supercar spirit, with room for everyone.",
            descriptionIt: "Urus Performante unisce un V8 ad alte prestazioni, trazione integrale e versatilità per i viaggi più ambiziosi.",
            descriptionEn: "The Urus Performante combines a high-performance V8, all-wheel drive and the versatility for ambitious journeys.",
            specs: [["engine", "4.0 L V8 biturbo", "4.0 L twin-turbo V8"], ["power", "666 CV", "657 hp"], ["acceleration", "3,3 s · 0–100 km/h", "3.3 s · 0–62 mph"], ["topSpeed", "306 km/h", "190 mph"], ["transmission", "Automatica a 8 rapporti", "8-speed automatic"], ["seats", "5 posti", "5 seats"], ["luggage", "616 L", "616 L"], ["drive", "Trazione integrale", "All-wheel drive"]]
        }),
        createVehicle({
            id: "bentley-bentayga", brand: "Bentley", name: { it: "Bentley Bentayga Azure", en: "Bentley Bentayga Azure" },
            class: "suv", price: 740, photoYear: 2023, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Bentley_Bentayga_%28FL%29_Azure_1X7A7439.jpg/960px-Bentley_Bentayga_%28FL%29_Azure_1X7A7439.jpg",
            source: "https://commons.wikimedia.org/wiki/File:Bentley_Bentayga_(FL)_Azure_1X7A7439.jpg", author: "Alexander-93", license: "CC BY-SA 4.0",
            altIt: "Bentley Bentayga Azure", altEn: "Bentley Bentayga Azure",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Bentley_Bentayga_Azure_in_Dove_Grey%2C_front_right.jpg/960px-Bentley_Bentayga_Azure_in_Dove_Grey%2C_front_right.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=172086218", author: "Mr.choppers", license: "CC BY-SA 4.0", altIt: "Bentley Bentayga Azure, vista anteriore destra", altEn: "Bentley Bentayga Azure, front right view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Bentley_Bentayga_V8_Azure_FL_Dark_Sapphire_%281%29.jpg/960px-Bentley_Bentayga_V8_Azure_FL_Dark_Sapphire_%281%29.jpg", source: "https://commons.wikimedia.org/wiki/File:Bentley_Bentayga_V8_Azure_FL_Dark_Sapphire_(1).jpg", author: "Damian B Oh", license: "CC BY-SA 4.0", altIt: "Bentley Bentayga V8 Azure Dark Sapphire", altEn: "Bentley Bentayga V8 Azure in Dark Sapphire" }
            ],
            taglineIt: "Il comfort di una suite, ovunque arrivi.", taglineEn: "Suite-level comfort, wherever you arrive.",
            descriptionIt: "Bentayga Azure privilegia il benessere a bordo, con interni raffinati, motore V8 e capacità da grande viaggiatrice.",
            descriptionEn: "The Bentayga Azure prioritises passenger comfort with a refined cabin, V8 power and long-distance capability.",
            specs: [["engine", "4.0 L V8 biturbo", "4.0 L twin-turbo V8"], ["power", "550 CV", "542 hp"], ["acceleration", "4,5 s · 0–100 km/h", "4.5 s · 0–62 mph"], ["topSpeed", "290 km/h", "180 mph"], ["transmission", "Automatica a 8 rapporti", "8-speed automatic"], ["seats", "5 posti", "5 seats"], ["luggage", "484 L", "484 L"], ["drive", "Trazione integrale", "All-wheel drive"]]
        }),
        createVehicle({
            id: "bmw-x7", brand: "BMW", name: { it: "BMW X7 M60i", en: "BMW X7 M60i" },
            class: "suv", price: 590, photoYear: 2023, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/BMW_G07_LCI_X7_M60i_xDrive_M_Marina_Bay_Blue_Metallic.jpg/960px-BMW_G07_LCI_X7_M60i_xDrive_M_Marina_Bay_Blue_Metallic.jpg",
            source: "https://commons.wikimedia.org/w/index.php?curid=130654021", author: "Damian B Oh", license: "CC BY-SA 4.0",
            altIt: "BMW X7 M60i LCI 2023, blu Marina Bay", altEn: "2023 BMW X7 M60i LCI in Marina Bay Blue",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/BMW_G07_X7_M60i_1X7A7226.jpg/960px-BMW_G07_X7_M60i_1X7A7226.jpg", source: "https://commons.wikimedia.org/wiki/File:BMW_G07_X7_M60i_1X7A7226.jpg", author: "Alexander-93", license: "CC BY-SA 4.0", altIt: "BMW X7 M60i G07, vista posteriore", altEn: "BMW X7 M60i G07, rear view" }
            ],
            taglineIt: "Spazio generoso, comfort di prima classe.", taglineEn: "Generous space and first-class comfort.",
            descriptionIt: "BMW X7 M60i offre tre file di sedili, un V8 mild hybrid e una guida confortevole anche sulle lunghe distanze.",
            descriptionEn: "The BMW X7 M60i combines three rows of seating, a V8 mild-hybrid powertrain and relaxed long-distance comfort.",
            specs: [["engine", "4.4 L V8 biturbo mild hybrid", "4.4 L twin-turbo mild-hybrid V8"], ["power", "530 CV", "523 hp"], ["acceleration", "4,7 s · 0–100 km/h", "4.7 s · 0–62 mph"], ["topSpeed", "250 km/h", "155 mph"], ["transmission", "Steptronic automatica a 8 rapporti", "8-speed Steptronic automatic"], ["seats", "7 posti", "7 seats"], ["luggage", "750 L", "750 L"], ["drive", "Trazione integrale xDrive", "xDrive all-wheel drive"]]
        }),
        createVehicle({
            id: "mercedes-amg-g63", brand: "Mercedes-Benz", name: { it: "Mercedes-AMG G 63", en: "Mercedes-AMG G 63" },
            class: "suv", price: 720, photoYear: 2019, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Mercedes-AMG_G_63%2C_GIMS_2018%2C_Le_Grand-Saconnex_%281X7A0541%29.jpg/960px-Mercedes-AMG_G_63%2C_GIMS_2018%2C_Le_Grand-Saconnex_%281X7A0541%29.jpg",
            source: "https://commons.wikimedia.org/wiki/File:Mercedes-AMG_G_63,_GIMS_2018,_Le_Grand-Saconnex_(1X7A0541).jpg", author: "Matti Blume", license: "CC BY-SA 4.0",
            altIt: "Mercedes-AMG G 63 al Salone di Ginevra 2018", altEn: "Mercedes-AMG G 63 at the 2018 Geneva Motor Show",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Mercedes-AMG_G_63_%282018%29_IMG_4370.jpg/960px-Mercedes-AMG_G_63_%282018%29_IMG_4370.jpg", source: "https://commons.wikimedia.org/wiki/File:Mercedes-AMG_G_63_(2018)_IMG_4370.jpg", author: "Alexander Migl", license: "CC BY-SA 4.0", altIt: "Mercedes-AMG G 63 del 2018, vista aggiuntiva", altEn: "2018 Mercedes-AMG G 63, additional view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/2019_Mercedes-AMG_G_63.jpg/960px-2019_Mercedes-AMG_G_63.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=81961720", author: "Chanokchon", license: "CC BY-SA 4.0", altIt: "Mercedes-AMG G 63 2019, vista esterna", altEn: "2019 Mercedes-AMG G 63, exterior view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Mercedes-AMG_G_63_%28W463A%29_interior.jpg/960px-Mercedes-AMG_G_63_%28W463A%29_interior.jpg", source: "https://commons.wikimedia.org/wiki/File:Mercedes-AMG_G_63_(W463A)_interior.jpg", author: "Tokumeigakarinoaoshima", license: "CC BY-SA 4.0", altIt: "Interni della Mercedes-AMG G 63, generazione W463A", altEn: "Mercedes-AMG G 63 W463A interior" }
            ],
            taglineIt: "Un’icona senza compromessi.", taglineEn: "An icon without compromise.",
            descriptionIt: "La Classe G AMG abbina un V8 biturbo a un’architettura robusta e a interni esclusivi, per una presenza inconfondibile.",
            descriptionEn: "The AMG G-Class pairs a twin-turbo V8 with robust engineering and an exclusive cabin for an unmistakable presence.",
            specs: [["engine", "4.0 L V8 biturbo", "4.0 L twin-turbo V8"], ["power", "585 CV", "577 hp"], ["acceleration", "4,5 s · 0–100 km/h", "4.5 s · 0–62 mph"], ["topSpeed", "220 km/h", "137 mph"], ["transmission", "AMG Speedshift a 9 rapporti", "9-speed AMG Speedshift"], ["seats", "5 posti", "5 seats"], ["luggage", "640 L", "640 L"], ["drive", "Trazione integrale 4MATIC", "4MATIC all-wheel drive"]]
        }),
        createVehicle({
            id: "maserati-levante", brand: "Maserati", name: { it: "Maserati Levante", en: "Maserati Levante" },
            class: "suv", price: 520, photoYear: 2017, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/17-06-09-Maserati_Levante-RalfR-IMG_20170609_161916_076a.jpg/960px-17-06-09-Maserati_Levante-RalfR-IMG_20170609_161916_076a.jpg",
            source: "https://commons.wikimedia.org/wiki/File:17-06-09-Maserati_Levante-RalfR-IMG_20170609_161916_076a.jpg", author: "Ralf Roletschek", license: "GFDL 1.2",
            altIt: "Maserati Levante", altEn: "Maserati Levante",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/17-06-09-Maserati_Levante-RalfR-IMG_20170609_162005_152a.jpg/960px-17-06-09-Maserati_Levante-RalfR-IMG_20170609_162005_152a.jpg", source: "https://commons.wikimedia.org/wiki/File:17-06-09-Maserati_Levante-RalfR-IMG_20170609_162005_152a.jpg", author: "Ralf Roletschek", license: "GFDL 1.2", altIt: "Maserati Levante, seconda vista", altEn: "Maserati Levante, second view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/17-06-09-Maserati_Levante-RalfR-IMG_20170609_162353_434a.jpg/960px-17-06-09-Maserati_Levante-RalfR-IMG_20170609_162353_434a.jpg", source: "https://commons.wikimedia.org/wiki/File:17-06-09-Maserati_Levante-RalfR-IMG_20170609_162353_434a.jpg", author: "Ralf Roletschek", license: "GFDL 1.2", altIt: "Maserati Levante, terza vista", altEn: "Maserati Levante, third view" }
            ],
            taglineIt: "Il carattere Maserati incontra la versatilità.", taglineEn: "Maserati character meets everyday versatility.",
            descriptionIt: "Levante interpreta il SUV di lusso con linee italiane, un V6 biturbo e trazione integrale per ogni itinerario.",
            descriptionEn: "The Levante brings Italian design, a twin-turbo V6 and all-wheel drive to the luxury SUV experience.",
            specs: [["engine", "3.0 L V6 biturbo", "3.0 L twin-turbo V6"], ["power", "350 CV", "345 hp"], ["acceleration", "6,0 s · 0–100 km/h", "6.0 s · 0–62 mph"], ["topSpeed", "251 km/h", "156 mph"], ["transmission", "Automatica ZF a 8 rapporti", "8-speed ZF automatic"], ["seats", "5 posti", "5 seats"], ["luggage", "580 L", "580 L"], ["drive", "Trazione integrale Q4", "Q4 all-wheel drive"]]
        }),
        createVehicle({
            id: "bentley-flying-spur", brand: "Bentley", name: { it: "Bentley Flying Spur Hybrid", en: "Bentley Flying Spur Hybrid" },
            class: "elegance", price: 780, photoYear: 2022, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/2022_Bentley_Flying_Spur_Hybrid_in_Ghost_White%2C_Odyssean_Specs%2C_front_right.jpg/960px-2022_Bentley_Flying_Spur_Hybrid_in_Ghost_White%2C_Odyssean_Specs%2C_front_right.jpg",
            source: "https://commons.wikimedia.org/w/index.php?curid=119714144", author: "Mr.choppers", license: "CC BY-SA 3.0",
            altIt: "Bentley Flying Spur Hybrid 2022, vista anteriore destra", altEn: "2022 Bentley Flying Spur Hybrid, front right view",
            additionalImages: [
                { src: "https://live.staticflickr.com/65535/52128822858_bf308f3b23_b.jpg", source: "https://www.flickr.com/photos/43494963@N03/52128822858", author: "usf1fan2", license: "CC BY 2.0", altIt: "Bentley Flying Spur Hybrid Odyssean Edition 2022, vista laterale", altEn: "2022 Bentley Flying Spur Hybrid Odyssean Edition, side view" },
                { src: "https://live.staticflickr.com/65535/52129290415_8a392810b6_b.jpg", source: "https://www.flickr.com/photos/43494963@N03/52129290415", author: "usf1fan2", license: "CC BY 2.0", altIt: "Bentley Flying Spur Hybrid Odyssean Edition 2022, vista posteriore", altEn: "2022 Bentley Flying Spur Hybrid Odyssean Edition, rear view" }
            ],
            taglineIt: "Una berlina grand touring dal comfort assoluto.", taglineEn: "A grand touring saloon with exceptional comfort.",
            descriptionIt: "Flying Spur Hybrid fonde artigianalità Bentley e propulsione ibrida, con una cabina progettata per viaggiare in prima classe.",
            descriptionEn: "The Flying Spur Hybrid blends Bentley craftsmanship with electrified performance and a cabin designed for first-class travel.",
            specs: [["engine", "2.9 L V6 ibrido plug-in", "2.9 L plug-in hybrid V6"], ["power", "544 CV", "536 hp"], ["acceleration", "4,3 s · 0–100 km/h", "4.3 s · 0–62 mph"], ["topSpeed", "285 km/h", "177 mph"], ["transmission", "Doppia frizione a 8 rapporti", "8-speed dual-clutch"], ["seats", "5 posti", "5 seats"], ["luggage", "351 L", "351 L"], ["drive", "Trazione integrale", "All-wheel drive"]]
        }),
        createVehicle({
            id: "bmw-7-series-750e", brand: "BMW", name: { it: "BMW Serie 7 750e", en: "BMW 7 Series 750e" },
            class: "elegance", price: 620, photoYear: 2023, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/BMW_7-Series_%28G70%29_750e_1X7A1895.jpg/960px-BMW_7-Series_%28G70%29_750e_1X7A1895.jpg",
            source: "https://commons.wikimedia.org/wiki/File:BMW_7-Series_(G70)_750e_1X7A1895.jpg", author: "Alexander-93", license: "CC BY-SA 4.0",
            altIt: "BMW Serie 7 750e G70", altEn: "BMW 7 Series 750e G70",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/BMW_7-Series_%28G70%29_750e_1X7A1897.jpg/960px-BMW_7-Series_%28G70%29_750e_1X7A1897.jpg", source: "https://commons.wikimedia.org/wiki/File:BMW_7-Series_(G70)_750e_1X7A1897.jpg", author: "Alexander-93", license: "CC BY-SA 4.0", altIt: "BMW Serie 7 750e G70, seconda vista", altEn: "BMW 7 Series 750e G70, second view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/BMW_7-Series_%28G70%29_750e_1X7A1899.jpg/960px-BMW_7-Series_%28G70%29_750e_1X7A1899.jpg", source: "https://commons.wikimedia.org/wiki/File:BMW_7-Series_(G70)_750e_1X7A1899.jpg", author: "Alexander-93", license: "CC BY-SA 4.0", altIt: "BMW Serie 7 750e G70, terza vista", altEn: "BMW 7 Series 750e G70, third view" }
            ],
            taglineIt: "Tecnologia discreta, viaggio raffinato.", taglineEn: "Quiet technology, refined travel.",
            descriptionIt: "La BMW 750e abbina un motore sei cilindri a un sistema plug-in hybrid e a un abitacolo dedicato al comfort.",
            descriptionEn: "The BMW 750e pairs a six-cylinder engine with plug-in hybrid technology and a cabin focused on comfort.",
            specs: [["engine", "3.0 L sei cilindri ibrido plug-in", "3.0 L plug-in hybrid inline-six"], ["power", "489 CV", "483 hp"], ["acceleration", "4,8 s · 0–100 km/h", "4.8 s · 0–62 mph"], ["topSpeed", "250 km/h", "155 mph"], ["transmission", "Steptronic automatica a 8 rapporti", "8-speed Steptronic automatic"], ["seats", "5 posti", "5 seats"], ["luggage", "525 L", "525 L"], ["drive", "Trazione integrale xDrive", "xDrive all-wheel drive"]]
        }),
        createVehicle({
            id: "audi-a8-l", brand: "Audi", name: { it: "Audi A8 L", en: "Audi A8 L" },
            class: "elegance", price: 580, photoYear: 2021, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Audi_A8L_D5_%282021%29_1X7A1787.jpg/960px-Audi_A8L_D5_%282021%29_1X7A1787.jpg",
            source: "https://commons.wikimedia.org/wiki/File:Audi_A8L_D5_(2021)_1X7A1787.jpg", author: "Alexander-93", license: "CC BY-SA 4.0",
            altIt: "Audi A8 L D5 del 2021, vista anteriore", altEn: "2021 Audi A8 L D5, front view",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/AUDI_A8L_D5_%28Typ_4N%29_China_%2810%29.jpg/960px-AUDI_A8L_D5_%28Typ_4N%29_China_%2810%29.jpg", source: "https://commons.wikimedia.org/wiki/File:AUDI_A8L_D5_(Typ_4N)_China_(10).jpg", author: "Dinkun Chen", license: "CC BY-SA 4.0", altIt: "Audi A8 L D5, vista laterale", altEn: "Audi A8 L D5, side view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Audi_A8_L_D5_Black_Valcona_Interior_with_Piano_Black_Inlay_%288%29.jpg/960px-Audi_A8_L_D5_Black_Valcona_Interior_with_Piano_Black_Inlay_%288%29.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=118012277", author: "Damian B Oh", license: "CC BY-SA 4.0", altIt: "Interni in pelle Valcona nera dell’Audi A8 L D5", altEn: "Audi A8 L D5 interior in black Valcona leather" }
            ],
            taglineIt: "Sofisticazione contemporanea, senza ostentazione.", taglineEn: "Contemporary sophistication, without excess.",
            descriptionIt: "A8 L offre proporzioni da grande berlina, interni curati e trazione quattro, ideale per trasferimenti e lunghi viaggi.",
            descriptionEn: "The A8 L combines full-size saloon proportions, a carefully finished cabin and quattro traction for city transfers and long journeys.",
            specs: [["engine", "3.0 L V6 TFSI mild hybrid", "3.0 L TFSI mild-hybrid V6"], ["power", "340 CV", "335 hp"], ["acceleration", "5,6 s · 0–100 km/h", "5.6 s · 0–62 mph"], ["topSpeed", "250 km/h", "155 mph"], ["transmission", "Tiptronic automatica a 8 rapporti", "8-speed Tiptronic automatic"], ["seats", "5 posti", "5 seats"], ["luggage", "505 L", "505 L"], ["drive", "Trazione integrale quattro", "quattro all-wheel drive"]]
        }),
        createVehicle({
            id: "porsche-panamera-turbo", brand: "Porsche", name: { it: "Porsche Panamera Turbo", en: "Porsche Panamera Turbo" },
            class: "elegance", price: 690, photoYear: 2018, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Porsche_971_Panamera_Turbo_1X7A6496.jpg/960px-Porsche_971_Panamera_Turbo_1X7A6496.jpg",
            source: "https://commons.wikimedia.org/wiki/File:Porsche_971_Panamera_Turbo_1X7A6496.jpg", author: "Alexander Migl", license: "CC BY-SA 4.0",
            altIt: "Porsche Panamera Turbo generazione 971", altEn: "Porsche Panamera Turbo 971",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Porsche_971_Panamera_Turbo_1X7A6497.jpg/960px-Porsche_971_Panamera_Turbo_1X7A6497.jpg", source: "https://commons.wikimedia.org/wiki/File:Porsche_971_Panamera_Turbo_1X7A6497.jpg", author: "Alexander Migl", license: "CC BY-SA 4.0", altIt: "Porsche Panamera Turbo 971, seconda vista", altEn: "Porsche Panamera Turbo 971, second view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Porsche_Panamera_Turbo_%28971%2C_2018%29_%2852577874790%29.jpg/960px-Porsche_Panamera_Turbo_%28971%2C_2018%29_%2852577874790%29.jpg", source: "https://commons.wikimedia.org/w/index.php?curid=179343922", author: "Charles from Port Chester, New York", license: "CC BY 2.0", altIt: "Porsche Panamera Turbo 971 2018, vista laterale", altEn: "2018 Porsche Panamera Turbo 971, side view" }
            ],
            taglineIt: "Prestazioni Porsche, spazio da gran turismo.", taglineEn: "Porsche performance with grand-touring space.",
            descriptionIt: "Panamera Turbo unisce la risposta di una sportiva alla comodità di una berlina, con un V8 biturbo e trazione integrale.",
            descriptionEn: "The Panamera Turbo combines sports-car response with saloon comfort, powered by a twin-turbo V8 and all-wheel drive.",
            specs: [["engine", "4.0 L V8 biturbo", "4.0 L twin-turbo V8"], ["power", "550 CV", "542 hp"], ["acceleration", "3,8 s · 0–100 km/h", "3.8 s · 0–62 mph"], ["topSpeed", "306 km/h", "190 mph"], ["transmission", "PDK a doppia frizione, 8 rapporti", "8-speed PDK dual-clutch"], ["seats", "4 posti", "4 seats"], ["luggage", "495 L", "495 L"], ["drive", "Trazione integrale", "All-wheel drive"]]
        }),
        createVehicle({
            id: "maserati-quattroporte", brand: "Maserati", name: { it: "Maserati Quattroporte", en: "Maserati Quattroporte" },
            class: "elegance", price: 570, photoYear: 2015, image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/2015_Maserati_Quattroporte_DV6_Automatic_3.0_Front.jpg/960px-2015_Maserati_Quattroporte_DV6_Automatic_3.0_Front.jpg",
            source: "https://commons.wikimedia.org/wiki/File:2015_Maserati_Quattroporte_DV6_Automatic_3.0_Front.jpg", author: "Vauxford", license: "CC BY-SA 4.0",
            altIt: "Maserati Quattroporte diesel automatica", altEn: "Maserati Quattroporte diesel automatic",
            additionalImages: [
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/15-04-18-Wien-Maserati-Quattroporte-M156-DSCF3615-RalfR-01.jpg/960px-15-04-18-Wien-Maserati-Quattroporte-M156-DSCF3615-RalfR-01.jpg", source: "https://commons.wikimedia.org/wiki/File:15-04-18-Wien-Maserati-Quattroporte-M156-DSCF3615-RalfR-01.jpg", author: "Ralf Roletschek", license: "GFDL 1.2", altIt: "Maserati Quattroporte M156, vista aggiuntiva", altEn: "Maserati Quattroporte M156, additional view" },
                { src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Maserati_Quattroporte%2C_Pau_2015.jpg/960px-Maserati_Quattroporte%2C_Pau_2015.jpg", source: "https://commons.wikimedia.org/wiki/File:Maserati_Quattroporte,_Pau_2015.jpg", author: "Handelsgeselschaft", license: "CC BY-SA 4.0", altIt: "Maserati Quattroporte a Pau nel 2015", altEn: "Maserati Quattroporte in Pau in 2015" }
            ],
            taglineIt: "Una firma italiana per ogni grande occasione.", taglineEn: "Italian style for every important occasion.",
            descriptionIt: "Quattroporte offre una silhouette elegante e un abitacolo spazioso, pensati per viaggiare con stile e comfort.",
            descriptionEn: "The Quattroporte pairs an elegant silhouette with a spacious cabin, designed for stylish and comfortable travel.",
            specs: [["engine", "3.0 L V6 turbodiesel", "3.0 L turbo-diesel V6"], ["power", "275 CV", "271 hp"], ["acceleration", "6,4 s · 0–100 km/h", "6.4 s · 0–62 mph"], ["topSpeed", "250 km/h", "155 mph"], ["transmission", "Automatica ZF a 8 rapporti", "8-speed ZF automatic"], ["seats", "5 posti", "5 seats"], ["luggage", "530 L", "530 L"], ["drive", "Trazione posteriore", "Rear-wheel drive"]]
        })
    ];
});
