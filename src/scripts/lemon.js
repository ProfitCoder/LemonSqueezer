const stats = {
    points: 0,
    pasiveUpgrades: [],
    activeUpgrades: [],
    clothes: [],

    getPoints: () => {
        return this.points;
    },

    setPoints: (n) => {
        this.points = n;
    },

    incrementPoints: (n) => {
        this.points = this.points + n;
    },
    decreasePoints: (n) => {
        setPoints(this.points - n);
    },
    addPasiveUpgrade: () => {

    },
    addActiveUpgrade: () => {
        
    },
    addClothes: () => {
        
    }
}



