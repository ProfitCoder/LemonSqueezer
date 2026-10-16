/*
Autor: Pablo Manuel Fernandez
Fecha: 16/10/2026
*/

const openUpgradesButton = document.getElementById("open-upgrades");
const closeUpgradesButton = document.getElementById("cerrar-upgrades");
const upgradesPanel = document.getElementById("upgrades-panel");

const shopPanel = document.querySelector(".shop");
const shopHeading = document.querySelector(".shop-head");
const mobileView = window.matchMedia("(max-width: 768px)");

/* Crea los controles de la tienda sin modificar el HTML */
shopPanel.id = "shop-panel";

const openShopButton = document.createElement("button");
openShopButton.id = "open-shop";
openShopButton.type = "button";
openShopButton.textContent = "☰ Tienda";
openShopButton.setAttribute("aria-controls", "shop-panel");
openShopButton.setAttribute("aria-expanded", "false");
document.body.append(openShopButton);

const closeShopButton = document.createElement("button");
closeShopButton.id = "close-shop";
closeShopButton.type = "button";
closeShopButton.textContent = "✕";
closeShopButton.setAttribute("aria-label", "Cerrar tienda");
shopHeading.append(closeShopButton);

function setUpgradesOpen(isOpen) {
    upgradesPanel.hidden = !isOpen;
    document.body.classList.toggle("menu-abierto", isOpen);
    openUpgradesButton.setAttribute("aria-expanded", String(isOpen));
}

function setShopOpen(isOpen) {
    document.body.classList.toggle("shop-open", isOpen);
    openShopButton.setAttribute("aria-expanded", String(isOpen));
}

function updateShopControls() {
    openShopButton.hidden = !mobileView.matches;
    closeShopButton.hidden = !mobileView.matches;
}

openUpgradesButton.addEventListener("click", () => {
    setShopOpen(false);
    setUpgradesOpen(true);
    closeUpgradesButton.focus();
});

closeUpgradesButton.addEventListener("click", () => {
    setUpgradesOpen(false);
    openUpgradesButton.focus();
});

openShopButton.addEventListener("click", () => {
    setUpgradesOpen(false);
    setShopOpen(true);
    closeShopButton.focus();
});

closeShopButton.addEventListener("click", () => {
    setShopOpen(false);
    openShopButton.focus();
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (document.body.classList.contains("shop-open")) {
        setShopOpen(false);
        openShopButton.focus();
    } else if (!upgradesPanel.hidden) {
        setUpgradesOpen(false);
        openUpgradesButton.focus();
    }
});

mobileView.addEventListener("change", () => {
    const wasShopOpen = document.body.classList.contains("shop-open");

    setShopOpen(false);
    updateShopControls();

    if (wasShopOpen) {
        openUpgradesButton.focus();
    }
});

updateShopControls();