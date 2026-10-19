import { LemonSpringer } from "./LemonSpringer.js";
import { LemonParticles } from "./LemonParticles.js";

import { stats } from "../stats.js";

// ----------------------------------------------
// CLASS
// ----------------------------------------------

export class Lemon
{
    // ----------------------------------------------
    // STATICS
    // ----------------------------------------------

    static #MINIMUM_DELAY_BETWEEN_CLICKS_TO_RUN_ANIMATIONS = 0.1;

    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #lemon = undefined;

    #lastTimeClicked = 0;

    #lemonSpringer = undefined;
    #lemonParticles = undefined;

    // ----------------------------------------------
    // CONSTRUCTOR
    // ----------------------------------------------

    /**
     * Creates a new clickable lemon with the given parameters
     * @param {HTMLElement} lemonElement Lemon's HTML element
     * @param {HTMLElement} particlesParentElement Particles' parent HTML element
     * @author Álvaro Fernández Barrero
     */
    constructor(lemonElement, particlesParentElement)
    {
        this.#lemon = lemonElement;

        this.#lemonParticles = new LemonParticles(lemonElement, particlesParentElement);
        this.#lemonSpringer = new LemonSpringer(lemonElement);

        this.#lemon.addEventListener("click", () => { this.#onclick(); });
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    /**
     * Plays the click animation (impulses the transform springs)
     * @author Álvaro Fernández Barrero
     */
    #playClickAnimation()
    {
        let now = Date.now();
        if (now - this.#lastTimeClicked < Lemon.#MINIMUM_DELAY_BETWEEN_CLICKS_TO_RUN_ANIMATIONS)
            return;

        this.#lastTimeClicked = now;

        this.#lemonSpringer.applyImpulse();
        this.#lemonParticles.spread();
    }

    playClickAnimationAuto() {
        this.#playClickAnimation();
    }

    /**
     * Callback for the click event
     * @author Álvaro Fernández Barrero
     */
    #onclick()
    {
        this.#playClickAnimation();
        stats.incrementPoints();
        stats.showPoints();
    }

    /**
     * Updates the lemon's springs and applies them to the lemon's transform
     * @author Álvaro Fernández Barrero
     */
    #update()
    {
        this.#lemonSpringer.update();
    }

    /**
     * Notifies the lemon to update its state
     * @author Álvaro Fernández Barrero
     */
    onNotify()
    {
        this.#update();
    }
}