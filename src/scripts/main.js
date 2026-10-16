import { Lemon } from './lemon/Lemon.js';
import { LemonsObserver } from './lemon/LemonsObserver.js';
import { printAllUpgrades, pasiveUpgradeList, autoUpgradeList } from './upgrades.js';
import {stats} from './stats.js';
import {} from './stats.js';


// ----------------------------------------------
// VARIABLES
// ----------------------------------------------

const lemonsObserver = new LemonsObserver();
const lemon = new Lemon(document.getElementById("lemon"), document.getElementById("lemon-container"));

// ----------------------------------------------
// ON START
// ----------------------------------------------

lemonsObserver.suscribe(lemon);
printAllUpgrades("pasiveItems", pasiveUpgradeList, "pasive");
printAllUpgrades("autoItems", autoUpgradeList, "auto");

// ----------------------------------------------
// GAME LOOP
// ----------------------------------------------

setInterval(
    () => {
        lemonsObserver.notify();
    },
    DELTA_TIME
);