//SATS OF THE PLAYER
const stats = {
    points: 1000,
    multiplier: 1,
    baseValue: 1,
    clicksPerSecond: 0,
    playerPasiveUpgradesList: [],
    playerAutoUpgradesList: [],
    activeUpgrades: [],
    clothes: [],
    totalPoints: 0,



    //POINTS METHODS

    getPoints: () => {
        return this.points;
    },

    setPoints: (n) => {
        this.points = n;
    },

    incrementPoints: function () {
        let sum = this.baseValue * this.multiplier;
        this.points += sum;
        this.totalPoints += sum;
        this.showPoints();
    },

    decreasePoints: function (n) {
        stats.setPoints(this.points - n);
    },


    showMultiplier: function () {
        document.getElementById("multiplier").textContent = Number.parseFloat(this.multiplier).toFixed(2);
    },

    showPoints: function () {
        document.getElementById("points").textContent = Number.parseFloat(this.points).toFixed(0);
    },

    setPoints(p) {
        this.points = p;
    },

    addUpgrade: function (upgradeList, key) {
        const price = calculateUpgradePrice(upgradeList, key);
        
        if (this.points >= price) {
            
            upgradeList[key].price = price;
            if (upgradeList === pasiveUpgradeList) {
                this.playerPasiveUpgradesList.push(upgradeList[key]);
                this.multiplier += upgradeList[key].multiplier;
                this.baseValue += upgradeList[key].baseValue;
                printAllUpgrades("pasiveItems", pasiveUpgradeList, "pasive");
            }
            else if (upgradeList === autoUpgradeList) {
                this.playerAutoUpgradesList.push(upgradeList[key]);
                this.clicksPerSecond += upgradeList[key].clicksPerSecond;
                autoClicker();
                printAllUpgrades("autoItems", autoUpgradeList, "auto");
                
            }
                printAllUpgrades("pasiveItems", pasiveUpgradeList, "pasive");

            
            this.decreasePoints(price);
            upgradeList[key].tier++;
            this.showMultiplier();
            this.showPoints();


        } else {
            console.log("No tienes suficientes puntos");
        }
    },

    showMultiplier: function () {
        document.getElementById("multiplier").textContent = "x" + Number.parseFloat(this.multiplier).toFixed(2);
    },

    showPoints: function () {
        document.getElementById("points").textContent =  "Points: " + Number.parseFloat(this.points).toFixed(0);
    },

    addActiveUpgrade: function () {

    },
    addClothes: function () {

    }

}



