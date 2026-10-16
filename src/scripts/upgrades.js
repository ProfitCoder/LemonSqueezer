//PASIVE UPGRADES VALUES
//upgrade[multiplier: 1.10, tier: 1- 3, price: 300];
const pasiveUpgradeList = {
    "spoon": [0.00, 1, 70, 1, "Gain 1 more lemon juice"],
    "fork": [0.10, 1, 300, 0, "106% more juice"],
    "manualTurmix": [0.15, 1, 500, 20, "Get 20 ml more per click!!"],
    "ogTurmix": [0.2, 1, 1000],
    "universeMixer": [0.3, 1, 1300]
};

const upgradeLists = {
    pasive: pasiveUpgradeList
};

//ALL UPGRADE TYPES 



//GENERAL FUNCTIONS 
function calculateUpgradePrice(upgradeList, key) {
    return upgradeList[key][2] * Math.sqrt((upgradeList[key][1]* 1.5));
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
        "<p>" + key + "</p>" +
        "<p>Tier: " + upgradeList[key][1] + "</p>" +
        "<p>Precio: " + Number.parseInt(calculateUpgradePrice(upgradeList, key)) + "</p>" +
        "<p>" + (upgradeList[key][4] ?? "") + "</p>" +
        "<button onclick=\"stats.addUpgrade(upgradeLists['" +
        listName + "'], '" + key + "')\">" +
        "Buy" +
        "</button>" +
        "</div>";
};

//console.log(pasiveUpgrades["spoon"][2]);