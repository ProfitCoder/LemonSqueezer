//upgrade[multiplier: 1.10, tier: 1- 3, price: 300];

var pasiveUpgrades = {
    "spoon": [0.05, 1, 100],
    "fork": [0.10, 1, 300],
    "manualTurmix": [0.15, 1, 500],
    "ogTurmix": [0.2, 1, 1000],
    "universeMixer": [0.3, 1, 1300]
};

function calculateUpgradePrice(key) {
    return pasiveUpgrades[key][2] * pasiveUpgrades[key][1];
}

function printAllUpgrades() {
    document.getElementById("shop").innerHTML = "";
    for (upgrade in pasiveUpgrades) {
        printUpgrade(upgrade);
    }
}

function printUpgrade(key) {
    document.getElementById("shop").innerHTML += "<div id='shopItem'><p>" + key + "<p>" +
        "<p>Tier: " + pasiveUpgrades[key][1] + "</p>" +
        "<p>Precio: " + calculateUpgradePrice(key) + "</p>" +
        "<button onclick=\"stats.addPasiveUpgrade('" + key + "')\">Buy</button>" +
        "</div>";
}

//console.log(pasiveUpgrades["spoon"][2]);
printAllUpgrades();