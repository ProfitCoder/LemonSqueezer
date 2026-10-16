//PASIVE UPGRADES VALUES
//upgrade[multiplier: 1.10, tier: 1- 3, price: 300];
// 
/*
const pasiveUpgradeList = {
    "spoon": [0.00, 1, 100, 1, "Gain 1 more lemon juice"],
    "fork": [0.10, 1, 300, 0, "106% more juice"],
    "manualTurmix": [0.15, 1, 500, 20, "Get 20 ml more per click!!"],
    "ogTurmix": [0.2, 1, 1000],
    "universeMixer": [0.3, 1, 1300]
};*/

const pasiveUpgradeList = [
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
        baseValue: 20,
        description: "Get 20 ml more per click!!"
    },
    {
        key: "ogTurmix",
        name: "OG Turmix 2000",
        multiplier: 0.20,
        tier: 1,
        price: 1000,
        baseValue: 0,
        description: ""
    },
    {
        key: "universeMixer",
        name: "UNIVERSE Mixer",
        multiplier: 0.30,
        tier: 1,
        price: 1300,
        baseValue: 0,
        description: ""
    }
];

const upgradeLists = {
    pasive: pasiveUpgradeList
};

//ALL UPGRADE TYPES 



//GENERAL FUNCTIONS 
function calculateUpgradePrice(upgradeList, key) {
    return upgradeList[key].price * Math.sqrt(upgradeList[key].tier * 1.1);
};

function printAllUpgrades(htmlId, upgradeList, listName) {
    document.getElementById(htmlId).innerHTML = "";
    for (const upgradeKey in upgradeList) {
        printUpgrade(htmlId, listName, upgradeList, upgradeKey);
    }
};

function printUpgrade(htmlId, listName, upgradeList, key) {
    document.getElementById(htmlId).innerHTML +=
        "<div  class=\"shopItem\" id='item-" + key + "'>" +
        "<p>" + upgradeList[key].name + "</p>" +
        "<p>Tier: " + upgradeList[key].tier + "</p>" +
        "<p>Precio: " + Number.parseInt(calculateUpgradePrice(upgradeList, key)) + "</p>" +
        "<p>" + (upgradeList[key].description ?? "") + "</p>" +
        "<button onclick=\"stats.addUpgrade(upgradeLists['" +
        listName + "'], '" + key + "')\">" +
        "Buy" +
        "</button>" +
        "</div>";
};

//console.log(pasiveUpgrades["spoon"][2]);