//PASIVE UPGRADES VALUES
//upgrade[multiplier: 1.10, tier: 1- 3, price: 300];
const pasiveUpgradeList = {
    "spoon": [0.05, 1, 100, "Gain 106% more lemon juice"],
    "fork": [0.10, 1, 300],
    "manualTurmix": [0.15, 1, 500],
    "ogTurmix": [0.2, 1, 1000],
    "universeMixer": [0.3, 1, 1300]
};


//GENERAL FUNCTIONS 
function calculateUpgradePrice(upgradeList, key) {
    return upgradeList[key][2] * upgradeList[key][1];
};

function printAllUpgrades(htmlId, upgradeList) {
    document.getElementById(htmlId).innerHTML = "";
    for (const upgrade in upgradeList) {
        printUpgrade(htmlId, upgradeList, upgrade);
        console.log(upgrade[1]);
    }
};

function printUpgrade(htmlId, upgradeList, key) {
    document.getElementById(htmlId).innerHTML += "<div id='item-"+ htmlId + "'><p>" + key + "<p>" +
        "<p>Tier: " + upgradeList[key][1] + "</p>" +
        "<p>Precio: " + calculateUpgradePrice(upgradeList, key) + "</p>" +
        "<button onclick=\"stats.addPasiveUpgrade('" + key + "')\">Buy</button>" +
        "</div>";
};

//console.log(pasiveUpgrades["spoon"][2]);