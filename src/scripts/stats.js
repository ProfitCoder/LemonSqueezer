//SATS OF THE PLAYER
const stats = {
    points: 222220,
    multiplier: 1,
    baseValue: 1,
    clicksPerSecond: 0,
    playerPasiveUpgradesList: [],
    playerAutoUpgradesList: [],
    activeUpgrades: [],
    clothes: [],
    totalPoints: 0,



    //POINTS METHODS

    //GETTERS & SETTERS

    getPoints: () => {
        return this.points;
    },

    setPoints: (n) => {
        this.points = n;
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

    showBaseValue (){
        document.getElementById("baseValue").textContent = "+ " + this.baseValue;
    },

    //ADD UPGRADE AND UPGRADE LOGIC

    addUpgrade: function (upgradeList, key) {
        const price = calculateUpgradePrice(upgradeList, key);

        if (this.points >= price) {

            this.decreasePoints(price);
            upgradeList[key].price = price * 0.75;
            upgradeList[key].tier++;

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

            this.showMultiplier();
            this.showBaseValue();
            this.showPoints();

        } else {
            alert("Not enough lemon");
        }
    },
}



