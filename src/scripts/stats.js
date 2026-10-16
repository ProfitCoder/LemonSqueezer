const stats = {
    points: 100,
    multiplier: 1,
    pasiveUpgradesColection: [],
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
        this.showPoints();
    },

    decreasePoints: function (n) {
        stats.setPoints(this.points - n);
    },

    addPasiveUpgrade: function (key) {
        console.log("Key recibida:", key);
        if (this.points >= calculateUpgradePrice(key)) {
            this.pasiveUpgradesColection.push(pasiveUpgrades[key]);
            this.multiplier += pasiveUpgrades[key][0];
            this.decreasePoints(calculateUpgradePrice(key));
        console.log("Mejora encontrada:", pasiveUpgrades[key][1]);

            pasiveUpgrades[key][1]++;
        console.log("Mejora encontrada:", pasiveUpgrades[key][1]);

            this.showMultiplier();
            this.showPoints();
            printAllUpgrades();

        }
        else {

        }
    },

    showMultiplier: function () {
        document.getElementById("multiplier").textContent =  Number.parseFloat(this.multiplier).toFixed(2);
    },

    showPoints: function () {
        document.getElementById("points").textContent =   Number.parseFloat(this.points).toFixed(0);
    },

    setPoints(p){
        this.points = p;
    },
    
    addActiveUpgrade: function () {

    },
    addClothes: function () {

    }
}



