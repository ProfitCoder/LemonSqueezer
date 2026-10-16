//PASIVE UPGRADES VALUES

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


const autoUpgradeList = [
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

const upgradeLists = {
    pasive: pasiveUpgradeList,
    auto: autoUpgradeList
};

//ALL UPGRADE TYPES 



//GENERAL FUNCTIONS 
function calculateUpgradePrice(upgradeList, key) {
    return upgradeList[key].price * Math.sqrt(upgradeList[key].tier * 1.05);
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

//AUTO FUNCTIONS

function click(){
    for(i = 0; i < stats.clicksPerSecond; i++) {
        console.log(stats.clicksPerSecond);
        stats.incrementPoints();
    }
    playClickAnimationAuto();
    
    playClickAnimation();
}

function autoClicker() {
    setInterval(click, 1000);
}

