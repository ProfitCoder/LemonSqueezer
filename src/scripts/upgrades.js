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
        state: true,
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
        state: true,
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
        state: true,
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
    auto: autoUpgradeList
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

