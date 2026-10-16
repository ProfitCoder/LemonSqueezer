const stats = {
    points: 0,
    multiplier = 1,
    pasiveUpgrades: [],
    activeUpgrades: [],
    clothes: [],


    getPoints: () => {
        return this.points;
    },

    setPoints: (n) => {
        this.points = n;
    },

    incrementPoints: function () {
        this.points = this.points + (1 * this.multiplier);
    },

    decreasePoints: function (n) {
        setPoints(this.points - n);
    },

    addPasiveUpgrade: function (pasiveUpgrade) {
        if (this.points >= calculateUpgradePrice(pasiveUpgrade)) {
            activeUpgrades.push(pasiveUpgrade);
            this.multiplier += pasiveUpgrade[0];
            this.points - this.calculateUpgradePrice(pasiveUpgrade);
            pasiveUpgrade[1]++;
        }
        else {

        }
    },

    calculateUpgradePrice: function (pasiveUpgrade) {
        return pasiveUpgrade[2] * pasiveUpgrade[1];
    },
    
    addActiveUpgrade: function () {

    },
    addClothes: function () {

    }
}



