import { calculateUpgradePrice } from './upgrades.js';
import { pasiveUpgradeList } from './upgrades.js';
import { activeUpgradeList } from './upgrades.js';
import { autoUpgradeList } from './upgrades.js';
import { printAllUpgrades } from './upgrades.js';
import { autoClicker } from './upgrades.js';

//SATS OF THE PLAYER
export const stats = {
    points: 222220,
    multiplier: 1,
    baseValue: 1,
    clicksPerSecond: 0,
    playerPasiveUpgradesList: [],
    playerAutoUpgradesList: [],
    playerActiveUpgradesList: [],
    clothes: [],
    totalPoints: 0,



    //POINTS METHODS

    //GETTERS & SETTERS

    getPoints: function() {
        return this.points;
    },

    setPoints: function(n) {
        this.points = n;
    },

    setClicksPerSecond: function(clicks) {
        this.clicksPerSecond = clicks;
    },

    getClicksPerSecond: function(){
        return this.clicksPerSecond;
    },

    setMultiplier: function(x) {
        this.multiplier = x;
    },

    getMultiplier() {
        return this.multiplier;
    },

    //POINT COUNT

    incrementPoints: function () {
        let sum = this.baseValue * this.multiplier;
        this.points += sum;
        this.totalPoints += sum;
        this.showPoints();
    },

    decreasePoints: function (n) {
        stats.setPoints(this.points - n);
    },
    
    showPoints: function () {
        document.getElementById("points").textContent = Number.parseFloat(this.points).toFixed(0);
    },

    showMultiplier: function () {
        document.getElementById("multiplier").textContent = Number.parseFloat(this.multiplier).toFixed(2);
    },

    showBaseValue: function (){
        document.getElementById("baseValue").textContent = "+ " + this.baseValue;
    },

    showClicksPerSecond: function (){
        document.getElementById("clicksPerSecond").textContent = "cps " + this.clicksPerSecond;
    },

    //ADD UPGRADE AND UPGRADE LOGIC

    addUpgrade: function (upgradeList, key, lemon) {
        const price = calculateUpgradePrice(upgradeList, key);

        if (this.points >= price) {

            this.decreasePoints(price);
            upgradeList[key].price = price * 0.75;
            upgradeList[key].tier++;

            if (upgradeList === pasiveUpgradeList) {
                this.playerPasiveUpgradesList.push(upgradeList[key]);
                this.multiplier += upgradeList[key].multiplier;
                this.baseValue += upgradeList[key].baseValue;
                printAllUpgrades("pasiveItems", pasiveUpgradeList, "pasive", lemon);
            }
            else if (upgradeList === autoUpgradeList) {
                this.playerAutoUpgradesList.push(upgradeList[key]);
                this.clicksPerSecond += upgradeList[key].clicksPerSecond;
                autoClicker(lemon);
                printAllUpgrades("autoItems", autoUpgradeList, "auto", lemon);

            }else if(upgradeList === activeUpgradeList) {
                this.playerActiveUpgradesList.push(upgradeList[key]);
                printAllUpgrades("activeItems", activeUpgradeList, "active", lemon);
                console.log(this.playerActiveUpgradesList);
                activeUpgradeList[key].cooldown *=  0.9;
                activeUpgradeList[key].multiplier *= 1.1;
                activeUpgradeList[key].clicksPerSecond *= 1.1;
                activeUpgradeList[key].activeTime *= 1.1;
                
            }

            this.showMultiplier();
            this.showBaseValue();
            this.showPoints();
            this.showClicksPerSecond();

        } else {
            alert("Not enough lemon");
        }
    },
}



