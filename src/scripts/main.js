import { Lemon } from './lemon/Lemon.js';
import { LemonsObserver } from './lemon/LemonsObserver.js';

// ----------------------------------------------
// VARIABLES
// ----------------------------------------------

const lemonsObserver = new LemonsObserver();
const lemon = new Lemon(document.getElementById("lemon"), document.getElementById("lemon-container"));

// ----------------------------------------------
// ON START
// ----------------------------------------------

lemonsObserver.suscribe(lemon);

// ----------------------------------------------
// GAME LOOP
// ----------------------------------------------

setInterval(
    () => {
        lemonsObserver.notify();
    },
    DELTA_TIME
);