//SATS OF THE PLAYER
const stats = {
    points: 100,
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
        console.log("Key recibida:", key);
        if (this.points >= calculateUpgradePrice(upgradeList, key)) {
            if (upgradeList = pasiveUpgradeList)
                this.playerPasiveUpgradesList.push(upgradeList[key]);

            this.multiplier += upgradeList[key][0];
            this.decreasePoints(calculateUpgradePrice(upgradeList, key));
            console.log("Mejora encontrada:", upgradeList[key][1]);

            upgradeList[key][1]++;
            console.log("Mejora encontrada:", upgradeList[key][1]);

            this.showMultiplier();
            this.showPoints();
            printAllUpgrades();

        }
        else {

        }
    },

    addActiveUpgrade: function () {

    },
    addClothes: function () {

    }

}



