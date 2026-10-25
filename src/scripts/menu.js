import { SFX } from './SFX.js';
/*
Autor: Pablo Manuel Fernandez
Fecha: 16/10/2026
*/

//AUDIOS

const open_shopAudio = new SFX(
    { name: "open_shop.mp3", type: "audio/mpeg" },
    { name: "open_shop.ogg", type: "audio/ogg" }
);

const close_shopAudio = new SFX(
    { name: "close_shop.mp3", type: "audio/mpeg" },
    { name: "close_shop.ogg", type: "audio/ogg" }
);

//FUCNTIONS FOR PLAYING AUDIOS

function playOpenShop(isOpen) {
    if (isOpen) {
        open_shopAudio.play();
    } else {
        close_shopAudio.play();
    }
}



// main.js imports this name; keep it for compatibility.
let menusReady = false;

export function prepararMenus() {
    if (menusReady) return;
    menusReady = true;

    const openUpgradesButton = document.getElementById("open-upgrades");
    const closeUpgradesButton = document.getElementById("cerrar-upgrades");
    const upgradesPanel = document.getElementById("upgrades-panel");
    const shopButton = document.getElementById("toggle-shop");
    const shopPanel = document.querySelector(".shop");
    let lastOpenedPanel = null;

    function setUpgradesOpen(isOpen, playSound = false) {
        if (!upgradesPanel) return;
        upgradesPanel.hidden = !isOpen;
        document.body.classList.toggle("menu-abierto", isOpen);
        openUpgradesButton?.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) lastOpenedPanel = "upgrades";
        if (playSound) playOpenShop(isOpen);
    }

    function setShopOpen(isOpen, playSound = false) {
        if (!shopPanel) return;
        shopPanel.hidden = !isOpen;
        document.body.classList.toggle("shop-open", isOpen);
        if (shopButton) {
            shopButton.textContent = isOpen ? "✕ Cerrar" : "🛒 Tienda";
            shopButton.setAttribute("aria-expanded", String(isOpen));
        }
        if (isOpen) lastOpenedPanel = "shop";
        if (playSound) playOpenShop(isOpen);
    }

    if (shopPanel) {
        shopPanel.id = "shop-panel";
        shopButton?.setAttribute("aria-controls", shopPanel.id);
    }

    openUpgradesButton?.addEventListener("click", () => {
        setUpgradesOpen(true, true);
        closeUpgradesButton?.focus();
    });
    closeUpgradesButton?.addEventListener("click", () => {
        setUpgradesOpen(false, true);
        openUpgradesButton?.focus();
    });
    shopButton?.addEventListener("click", () => {
        setShopOpen(!document.body.classList.contains("shop-open"), true);
    });
    upgradesPanel?.addEventListener("pointerdown", () => { lastOpenedPanel = "upgrades"; });
    shopPanel?.addEventListener("pointerdown", () => { lastOpenedPanel = "shop"; });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        const upgradesOpen = upgradesPanel && !upgradesPanel.hidden;
        const shopOpen = document.body.classList.contains("shop-open");
        if (shopOpen && (lastOpenedPanel === "shop" || !upgradesOpen)) {
            setShopOpen(false, true);
            shopButton?.focus();
        } else if (upgradesOpen) {
            setUpgradesOpen(false, true);
            openUpgradesButton?.focus();
        }
    });

    setUpgradesOpen(false);
    setShopOpen(false);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prepararMenus, { once: true });
} else {
    prepararMenus();
}
