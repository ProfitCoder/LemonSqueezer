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
    }, {
        key: "lemonUniverse",
        name: "Lemon UNIVERSE",
        clicksPerSecond: 1,
        tier: 1,
        price: 1000000,
        description: "Gain 1 more lemon juice every second"
    },

];

//ACTIVE UPGRADES VALUE

export const activeUpgradeList = [
    {
        key: "lemonRain",
        name: "Lemon Rain",
        canBePlayed: true,
        clicksPerSecond: 0,
        baseValue: 0,
        multiplier: 3,
        cooldown: 200,
        activeTime: 10,
        tier: 1,
        price: 100,
        description: "Gain more for 10 seconds"
    },
    {
        key: "lemonDance",
        name: "Lemon Rain",
        canBePlayed: true,
        clicksPerSecond: 10,
        multiplier: 0,
        baseValue: 0,
        cooldown: 300,
        activeTime: 10,
        tier: 1,
        price: 500,
        description: "Gain 1 more lemon juice every second"
    },
    {
        key: "lemonRain",
        name: "Lemon Rain",
        canBePlayed: true,
        clicksPerSecond: 1,
        baseValue: 0,
        multiplier: 0,
        cooldown: 60,
        activeTime: 10,
        tier: 1,
        price: 2000,
        description: "Gain 1 more lemon juice every second"
    },


];


//parts -> legs, feet, torso, head
export const clothesList = [
    {
        key: "coolPants",
        name: "Cool Pants",
        tier: 1,
        price: 2000,
        part: "legs",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "jeans",
        name: "Blue Jeans",
        tier: 1,
        price: 1500,
        part: "legs",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "shorts",
        name: "Sport Shorts",
        tier: 1,
        price: 1000,
        part: "legs",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "sneakers",
        name: "White Sneakers",
        tier: 1,
        price: 1200,
        part: "feet",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "boots",
        name: "Black Boots",
        tier: 1,
        price: 2500,
        part: "feet",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "sandals",
        name: "Summer Sandals",
        tier: 1,
        price: 800,
        part: "feet",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "hoodie",
        name: "Red Hoodie",
        tier: 1,
        price: 3000,
        part: "torso",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "tshirt",
        name: "Basic T-Shirt",
        tier: 1,
        price: 1000,
        part: "torso",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "jacket",
        name: "Leather Jacket",
        tier: 1,
        price: 5000,
        part: "torso",
        owned: false,
        description: "",
        img: undefined
    },
    {
        key: "cap",
        name: "Baseball Cap",
        tier: 1,
        price: 700,
        part: "head",
        owned: false,
        description: "",
        img: undefined
    }
];

//ALL UPGRADE TYPES 

const upgradeLists = {
    pasive: pasiveUpgradeList,
    auto: autoUpgradeList,
    active: activeUpgradeList,
};


//GENERAL FUNCTIONS 
export function calculateUpgradePrice(upgradeList, key) {
    return Math.floor(upgradeList[key].price * Math.sqrt(upgradeList[key].tier * 1.5));
};


//PRINT UPGRADES

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

//PRINT ACTIVE UPGRADES

export function printAllActiveUpgrades(htmlId, upgradeList, listName, lemon) {
    document.getElementById(htmlId).innerHTML = "";
    for (const upgradeKey in upgradeList) {
        printActiveUpgrade(htmlId, listName, upgradeKey, lemon);
    }
};


function printActiveUpgrade(htmlId, listName, key, lemon) {
    const container = document.getElementById(htmlId);

    const item = document.createElement("div");
    item.className = "activeItem";

    item.innerHTML = `
        <p>${activeUpgradeList[key].name}</p>
        <p>Tier: ${activeUpgradeList[key].tier}</p>
        <p>Active time: ${activeUpgradeList[key].activeTime}</p>
        <p>Cooldown: ${activeUpgradeList[key].cooldown}</p>
        <p>Multiplier: ${activeUpgradeList[key].multiplier}</p>
        <p>Base Lemons: ${activeUpgradeList[key].baseValue}</p>
        <p>${activeUpgradeList[key].description ?? ""}</p>
    `;

    const button = document.createElement("button");
    button.textContent = "TURBO";

    button.addEventListener("click", () => {
        activeEfect(key, lemon);
    });

    item.appendChild(button);
    container.appendChild(item);
}

//PRINT CLOTHES UPGRADES

export function printAllclothesShopUpgrades(htmlId, lemon) {
    document.getElementById(htmlId).innerHTML = "";
    for (const upgradeKey in clothesList) {
        if(clothesList[upgradeKey].owned == false)
            printClothesShopUpgrades(htmlId, upgradeKey, lemon);
    }
};

function printClothesShopUpgrades(htmlId, key, lemon) {
    const container = document.getElementById(htmlId);

    const item = document.createElement("div");
    item.className = "shopItem";

    item.innerHTML = `
        <p>${clothesList[key].name}</p>
        <p>Price: ${clothesList[key].price}</p>
        <p>Body Part: ${clothesList[key].part}</p>
        <p>${clothesList[key].description ?? ""}</p>
    `;

    const button = document.createElement("button");
    button.textContent = "Buy";

    button.addEventListener("click", () => {
        stats.addUpgrade(clothesList , key, lemon);
    });

    item.appendChild(button);
    container.appendChild(item);
}

//AUTO FUNCTIONS

let lastAnimationTime = 0;
const animationInterval = 100;

function click(lemon) {
    stats.incrementPoints();

    const now = Date.now();

    if (now - lastAnimationTime >= animationInterval) {
        lemon.playClickAnimationAuto();
        lastAnimationTime = now;
    }
}

export function autoClicker(lemon) {
    setInterval(() => click(lemon), 1000);
}

//ACTIVE FUNCTIONS

var activeIntervals = {};

function activeEfect(key, lemon) {
    if (activeUpgradeList[key].canBePlayed) {

        activeUpgradeList[key].canBePlayed = false;

        stats.setClicksPerSecond(stats.getClicksPerSecond() + activeUpgradeList[key].clicksPerSecond);
        stats.setMultiplier(stats.getMultiplier() + activeUpgradeList[key].multiplier);
        stats.setBaseValue(stats.getBaseValue() + activeUpgradeList[key].baseValue);

        stats.showPoints();
        stats.showMultiplier();
        stats.showClicksPerSecond();
        stats.showBaseValue();

        let cooldown = activeUpgradeList[key].cooldown;
        let activeTime = activeUpgradeList[key].activeTime;

        activeIntervals[key] = {}

        activeIntervals[key].cooldown = setInterval(() => activeCooldownCallback(key, lemon, cooldown), 1000);
        activeIntervals[key].timeActive = setInterval(() => activeTimeCallback(key, lemon, activeTime), 1000);
    }
}


//CALLBACK FUNTIONS FOR ACTIVE UPGRADE TIMERS


function activeTimeCallback(key, lemon, activeTime) {
    if (activeUpgradeList[key].activeTime > 0) {
        activeUpgradeList[key].activeTime--;
        printAllActiveUpgrades("activeItemsOwned", stats.playerActiveUpgradesList, "activeOwned", lemon);
        if (activeUpgradeList[key] != 0) {
            click(lemon);
        }
    }
    else {
        stats.setClicksPerSecond(stats.getClicksPerSecond() - activeUpgradeList[key].clicksPerSecond);
        stats.setMultiplier(stats.getMultiplier() - activeUpgradeList[key].multiplier);
        stats.setBaseValue(stats.getBaseValue() - activeUpgradeList[key].baseValue);

        stats.showPoints();
        stats.showMultiplier();
        stats.showClicksPerSecond();
        stats.showBaseValue();

        activeUpgradeList[key].activeTime = activeTime;
        printAllActiveUpgrades("activeItemsOwned", stats.playerActiveUpgradesList, "activeOwned", lemon);

        clearInterval(activeIntervals[key].timeActive);
    }
}


function activeCooldownCallback(key, lemon, cooldown) {

    if (activeUpgradeList[key].cooldown > 0) {
        activeUpgradeList[key].cooldown--;
        console.log(activeUpgradeList[key].cooldown);
        printAllActiveUpgrades("activeItemsOwned", stats.playerActiveUpgradesList, "activeOwned", lemon);

    }
    else {
        console.log("a");

        activeUpgradeList[key].cooldown = cooldown;
        activeUpgradeList[key].canBePlayed = true;
        printAllActiveUpgrades("activeItemsOwned", stats.playerActiveUpgradesList, "activeOwned", lemon);

        clearInterval(activeIntervals[key].cooldown);
    }
}

