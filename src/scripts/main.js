import { Lemon } from './lemon/Lemon.js';
import { LemonsObserver } from './lemon/LemonsObserver.js';
import { printAllUpgrades, pasiveUpgradeList, autoUpgradeList, autoClicker, activeUpgradeList, printAllActiveUpgrades } from './upgrades.js';
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

// ----------------------------------------------
// GAME LOOP
// ----------------------------------------------

setInterval(
    () => {
        lemonsObserver.notify();
    },
    DELTA_TIME
);