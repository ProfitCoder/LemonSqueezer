import { Lemon } from './lemon/Lemon.js';
import { LemonsObserver } from './lemon/LemonsObserver.js';
import { printAllUpgrades, pasiveUpgradeList, autoUpgradeList, autoClicker,
        activeUpgradeList, printAllActiveUpgrades,
        printAllclothesShopUpgrades } from './upgrades.js';

import {stats} from './stats.js';




// ----------------------------------------------
// VARIABLES
// ----------------------------------------------

const lemonsObserver = new LemonsObserver();
const lemon = new Lemon(document.getElementById("lemon"), document.getElementById("lemon-container"));

// ----------------------------------------------
// ON START
// ----------------------------------------------

lemonsObserver.suscribe(lemon);
printAllUpgrades("pasiveItems", pasiveUpgradeList, "pasive", lemon);
printAllUpgrades("autoItems", autoUpgradeList, "auto", lemon);
printAllUpgrades("activeItems", activeUpgradeList, "active", lemon);
printAllActiveUpgrades("activeItemsOwned", stats.playerActiveUpgradesList, "activeOwned", lemon);
printAllclothesShopUpgrades("clothesItems", lemon);

// ----------------------------------------------
// GAME LOOP
// ----------------------------------------------

setInterval(
    () => {
        lemonsObserver.notify();
    },
    DELTA_TIME
);

// Abrir y cerrar el panel de mejoras
const openUpgradesButton = document.getElementById("open-upgrades");
const closeUpgradesButton = document.getElementById("cerrar-upgrades");
const upgradesPanel = document.getElementById("upgrades-panel");

function setUpgradesOpen(isOpen) {
    upgradesPanel.hidden = !isOpen;
    document.body.classList.toggle("menu-abierto", isOpen);
    openUpgradesButton.setAttribute("aria-expanded", String(isOpen));
}

// Empieza cerrado
setUpgradesOpen(false);

openUpgradesButton.addEventListener("click", () => {
    console.log("Abriendo tienda");
    setUpgradesOpen(true);
    closeUpgradesButton.focus();
    lemon.playOpenShop(true);
});

closeUpgradesButton.addEventListener("click", () => {
    setUpgradesOpen(false);
    openUpgradesButton.focus();
    lemon.playOpenShop(false);
});