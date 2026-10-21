import { SFX } from '../SFX.js';

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

    #sfx = [];

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

        this.#setUpAudios();

        this.#lemon.addEventListener("click", () => { this.#onclick(); });
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    /**
     * Sets up click audios
     * @author Álvaro Fernández Barrero
     */
    #setUpAudios()
    {
        const audio1 = new SFX(
            {name: "lemon_squeeze_1.mp3", type: "audio/mpeg"},
            {name: "lemon_squeeze_1.ogg", type: "audio/ogg"}
        );

        const audio2 = new SFX(
            {name: "lemon_squeeze_2.mp3", type: "audio/mpeg"},
            {name: "lemon_squeeze_2.ogg", type: "audio/ogg"}
        );

        const audio3 = new SFX(
            {name: "lemon_squeeze_3.mp3", type: "audio/mpeg"},
            {name: "lemon_squeeze_3.ogg", type: "audio/ogg"}
        );

        this.#sfx.push(audio1, audio2, audio3);
    }

    /**
     * Plays a random squeeze audio
     * @author Álvaro Fernández Barrero
     */
    #playClickSfx()
    {
        this.#sfx[Math.floor(Math.random() * this.#sfx.length)].play();
    }

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
        this.#playClickSfx();

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