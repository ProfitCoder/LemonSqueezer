import { Lemon } from "./Lemon.js";

// ----------------------------------------------
// CLASS
// ----------------------------------------------

export class LemonsObserver
{
    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #lemons = [];

    // ----------------------------------------------
    // CONSTRUCTOR
    // ----------------------------------------------

    constructor()
    {
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    suscribe(lemon)
    {
        this.#lemons.push(lemon);
    }

    notify(deltaSeconds)
    {
        this.#lemons.forEach(lemon => lemon.onNotify(deltaSeconds));
    }
}