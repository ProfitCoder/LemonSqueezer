//SATS OF THE PLAYER
const stats = {
    points: 20000,
    multiplier: 1,
    baseValue: 1,
    playerPasiveUpgradesList: [],
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
        upgradeList[key][2] = price;
 
        if (this.points >= price) {

            if (upgradeList === pasiveUpgradeList) {
                this.playerPasiveUpgradesList.push(key);
            }

            this.decreasePoints(price);

            this.multiplier += upgradeList[key][0];
            this.baseValue += upgradeList[key][3];

            upgradeList[key][1]++;
            console.log(upgradeList[key][1]);

            this.showMultiplier();
            this.showPoints();

            printAllUpgrades("pasiveItems", pasiveUpgradeList, "pasive");

        } else {
            console.log("No tienes suficientes puntos");
        }
    },


    addActiveUpgrade: function () {

    },
    addClothes: function () {

    }

}



