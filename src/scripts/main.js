import { Lemon } from './lemon/Lemon.js';
import { LemonsObserver } from './lemon/LemonsObserver.js';
import {
    printAllUpgrades, pasiveUpgradeList, autoUpgradeList, autoClicker,
    activeUpgradeList, printAllActiveUpgrades,
    printAllclothesShopUpgrades
} from './upgrades.js';

import { stats } from './stats.js';
import { SFX } from './SFX.js';
import { prepararMenus  } from './menu.js';




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

// One screen-synchronised loop, using elapsed seconds for the springs.
let previousFrameTime = null;

function animateGame(timestamp) {
    if (!document.hidden && previousFrameTime !== null) {
        const deltaSeconds = Math.min((timestamp - previousFrameTime) / 1000, 0.05);
        lemonsObserver.notify(deltaSeconds);
    }
    previousFrameTime = document.hidden ? null : timestamp;
    requestAnimationFrame(animateGame);
}

document.addEventListener("visibilitychange", () => {
    previousFrameTime = null;
});
requestAnimationFrame(animateGame);
