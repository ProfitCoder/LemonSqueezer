import { stats } from "./stats.js";
import { Lemon } from "./lemon/Lemon.js";

//New lemon to use private method playClickAnimation


//PASIVE UPGRADES VALUES

export const pasiveUpgradeList = [
    {
        key: "spoon",
        name: "Spoon",
        multiplier: 0.00,
        tier: 1,
        price: 70,
        baseValue: 1,
        description: "Gain 1 more lemon juice"
    },
    {
        key: "fork",
        name: "Fork",
        multiplier: 0.10,
        tier: 1,
        price: 300,
        baseValue: 0,
        description: "106% more juice"
    },
    {
        key: "manualTurmix",
        name: "Manual Turmix",
        multiplier: 0,
        tier: 1,
        price: 500,
        baseValue: 5,
        description: "Get 5 ml more per sqeeze!!"
    },
    {
        key: "ogTurmix",
        name: "OG Turmix 2000",
        multiplier: 0.20,
        tier: 1,
        price: 1000,
        baseValue: 0,
        description: "Almost the best money can buy. + 20% ml"
    },
    {
        key: "universeMixer",
        name: "UNIVERSE Mixer",
        multiplier: 0,
        tier: 1,
        price: 1300,
        baseValue: 10,
        description: "The best money can buy. + 10 ml/squeeze"
    }
];

//AUTO UPGRADES VALUES


export const autoUpgradeList = [
    {
        key: "lemonTree",
        name: "Lemon Tree",
        clicksPerSecond: 1,
        tier: 1,
        price: 100,
        description: "Gain 1 more lemon juice every second"
    },
    {
        key: "lemonFarm",
        name: "Lemon Farm",
        clicksPerSecond: 5,
        tier: 1,
        price: 1000,
        description: "Gain 5 more lemon juice every second"
    },
    {
        key: "lemonEmpire",
        name: "Lemon Empire",
        clicksPerSecond: 1,
        tier: 1,
        price: 20000,
        description: "Gain 1 more lemon juice every second"
    },
    {
        key: "lemonGod",
        name: "Lemon God",
        clicksPerSecond: 1,
        tier: 1,
        price: 1000000,
        description: "Gain 1 more lemon juice every second"
    },{
        key: "lemonUniverse",
        name: "Lemon UNIVERSE",
        clicksPerSecond: 1,
        tier: 1,
        price: 1000000,
        description: "Gain 1 more lemon juice every second"
    },
    
];

export const activeUpgradeList = [
    {
        key: "lemonRain",
        name: "Lemon Rain",
        canBePlayed: true,
        clicksPerSecond: 0,
        multiplier: 3,
        cooldown: 60,
        activeTime: 10,
        tier: 1,
        price: 100,
        description: "Gain x2 for every tier for 10 seconds"
    },
    {
        key: "lemonDance",
        name: "Lemon Rain",
        canBePlay: true,
        clicksPerSecond: 10,
        multiplier: 2,
        cooldown: 60,
        activeTime: 10,
        tier: 1,
        price: 100,
        description: "Gain 1 more lemon juice every second"
    },
    {
        key: "lemonRain",
        name: "Lemon Rain",
        canBePlay: true,
        clicksPerSecond: 1,
        multiplier: 0,
        cooldown: 60,
        activeTime: 10,
        tier: 1,
        price: 100,
        description: "Gain 1 more lemon juice every second"
    },
    
    
];

const upgradeLists = {
    pasive: pasiveUpgradeList,
    auto: autoUpgradeList,
    active: activeUpgradeList,
};

//ALL UPGRADE TYPES 



//GENERAL FUNCTIONS 
export function calculateUpgradePrice(upgradeList, key) {
    return Math.floor(upgradeList[key].price * Math.sqrt(upgradeList[key].tier * 1.5));
};

export function printAllUpgrades(htmlId, upgradeList, listName, lemon) {
    document.getElementById(htmlId).innerHTML = "";
    for (const upgradeKey in upgradeList) {
        printUpgrade(htmlId, listName, upgradeList, upgradeKey, lemon);
    }
};

function printUpgrade(htmlId, listName, upgradeList, key, lemon) {
    const container = document.getElementById(htmlId);

    const item = document.createElement("div");
    item.className = "shopItem";

    item.innerHTML = `
        <p>${upgradeList[key].name}</p>
        <p>Tier: ${upgradeList[key].tier}</p>
        <p>Precio: ${calculateUpgradePrice(upgradeList, key)}</p>
        <p>${upgradeList[key].description ?? ""}</p>
    `;

    const button = document.createElement("button");
    button.textContent = "Buy";

    button.addEventListener("click", () => {
        stats.addUpgrade(upgradeLists[listName], key, lemon);
    });

    item.appendChild(button);
    container.appendChild(item);
}

function printOwnedActiveUpgrades() {
    const container = document.getElementById()
}

function printActiveUpgrade(htmlId, listName, key, lemon) {
    const container = document.getElementById(htmlId);

    const item = document.createElement("div");
    item.className = "activeItem";

    item.innerHTML = `
        <p>${activeUpgradeList[key].name}</p>
        <p>Tier: ${activeUpgradeList[key].tier}</p>
        <p>${activeUpgradeList[key].description ?? ""}</p>
    `;

    const button = document.createElement("button");
    button.textContent = "Buy";

    button.addEventListener("click", () => {
        stats.activeEfect(activeUpgradeList, key, lemon);
    });

    item.appendChild(button);
    container.appendChild(item);
}

//console.log(pasiveUpgrades["spoon"][2]);

//AUTO FUNCTIONS

function click(lemon){
    for(let i = 0; i < stats.clicksPerSecond; i++) {
        console.log(stats.clicksPerSecond);
        stats.incrementPoints();
    }    
    lemon.playClickAnimationAuto();
}

export function autoClicker(lemon) {
    setInterval(() => click(lemon), 1000);
}

//ACTIVE FUNCTIONS

var activeIntervals = [];

function activeEfect(key, lemon)  {
    if(activeUpgradeList[key].canBePlayed)
        activeUpgradeList[key].canBePlayed = false;
        stats.setClicksPerSecond(stats.getClicksPerSecond() + activeUpgradeList[key].clicksPerSecond);
        stats.setMultiplier(stats.getMultiplier() + activeUpgradeList[key].multiplier);
        let cooldown = activeUpgradeList[key].cooldown;
        let activeTime = activeUpgradeList[key].activeTime;
        interval[key][cooldown] =  setInterval(() => activeCooldownCallback(key, lemon, cooldown), 1000);
        interval[key][timeActive] =  setInterval(() => activeTimeCallback(key, lemon, activeTime), 1000);
}

function activeTimeCallback (key, lemon, activeTime) {
    if(activeTime > 0 ) {
        activeUpgradeList[key].activeTime--;
        console.log(activeUpgradeList[key].activeTime);

    }
    else{
        stats.setClicksPerSecond(stats.getClicksPerSecond() - activeUpgradeList[key].clicksPerSecond);
        stats.setMultiplier(stats.getMultiplier() - activeUpgradeList[key].multiplier);
        activeUpgradeList[key].activeTime = activeTime;
        clearInterval(interval[key][timeActive]);
    }
}


function activeCooldownCallback(key, lemon, cooldown) {
    
    if(cooldown > 0) {
        activeUpgradeList[key].cooldown--;
        console.log(activeUpgradeList[key].cooldown);
        click(lemon);
    }
    else{
        stats.setClicksPerSecond(stats.getClicksPerSecond() - activeUpgradeList[key].clicksPerSecond);
        stats.setMultiplier(stats.getMultiplier() - activeUpgradeList[key].multiplier);
        activeUpgradeList[key].cooldown = cooldown;
        activeUpgradeList[key].canBePlayed = true;
        clearInterval(activeIntervals[key][cooldown]);
    }
}

