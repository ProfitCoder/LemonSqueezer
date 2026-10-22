import { SFX } from '../SFX.js';

import { LemonSpringer } from "./LemonSpringer.js";
import { LemonParticles } from "./LemonParticles.js";

import { stats } from "../stats.js";

// ----------------------------------------------
// CLASS
// ----------------------------------------------

export class Lemon {
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

    #firstTime = true;

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
    constructor(lemonElement, particlesParentElement) {
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
     *  @author Álvaro Fernández Barrero
     *  @SoundDesign by VIZIUS_X
     */
    #setUpAudios() {
        const audio1 = new SFX(
            { name: "lemon_squeeze_1.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_1.ogg", type: "audio/ogg" }
        );

        const audio2 = new SFX(
            { name: "lemon_squeeze_2.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_2.ogg", type: "audio/ogg" }
        );

        const audio3 = new SFX(
            { name: "lemon_squeeze_3.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_3.ogg", type: "audio/ogg" }
        );

        const audio4 = new SFX(
            { name: "lemon_squeeze_4.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_4.ogg", type: "audio/ogg" }
        );

        const audio5 = new SFX(
            { name: "lemon_squeeze_5.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_5.ogg", type: "audio/ogg" }
        );

        const audio6 = new SFX(
            { name: "lemon_squeeze_6.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_6.ogg", type: "audio/ogg" }
        );

        const audio7 = new SFX(
            { name: "lemon_squeeze_7.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_7.ogg", type: "audio/ogg" }
        );

        const audio8 = new SFX(
            { name: "lemon_squeeze_8.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_8.ogg", type: "audio/ogg" }
        );

        const audio9 = new SFX(
            { name: "lemon_squeeze_9.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_9.ogg", type: "audio/ogg" }
        );

        const audio10 = new SFX(
            { name: "lemon_squeeze_10.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_10.ogg", type: "audio/ogg" }
        );

        const audio11 = new SFX(
            { name: "lemon_squeeze_11.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_11.ogg", type: "audio/ogg" }
        );

        const audio12 = new SFX(
            { name: "lemon_squeeze_12.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_12.ogg", type: "audio/ogg" }
        );

        const audio13 = new SFX(
            { name: "lemon_squeeze_13.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_13.ogg", type: "audio/ogg" }
        );

        const audio14 = new SFX(
            { name: "lemon_squeeze_14.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_14.ogg", type: "audio/ogg" }
        );

        const audio15 = new SFX(
            { name: "lemon_squeeze_15.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_15.ogg", type: "audio/ogg" }
        );

        const audio16 = new SFX(
            { name: "lemon_squeeze_16.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_16.ogg", type: "audio/ogg" }
        );

        const audio17 = new SFX(
            { name: "lemon_squeeze_17.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_17.ogg", type: "audio/ogg" }
        );

        const audio18 = new SFX(
            { name: "lemon_squeeze_18.mp3", type: "audio/mpeg" },
            { name: "lemon_squeeze_18.ogg", type: "audio/ogg" }
        );

        const open_shopAudio = new SFX(
            { name: "open_shop.mp3", type: "audio/mpeg" },
            { name: "open_shop.ogg", type: "audio/ogg" }
        );

        const close_shopAudio = new SFX(
            { name: "close_shop.mp3", type: "audio/mpeg" },
            { name: "close_shop.ogg", type: "audio/ogg" }
        );



        this.#sfx.push(
            audio1, audio2, audio3, audio4, audio5, audio6,
            audio7, audio8, audio9, audio10, audio11, audio12,
            audio13, audio14, audio15, audio16, audio17, audio18
        );
    }

    /**
     * Plays a random squeeze audio
     * @author Álvaro Fernández Barrero
     */
    #playClickSfx() {
        this.#sfx[Math.floor(Math.random() * this.#sfx.length)].play();
    }

    

    playOpenShop(isOpen) {
        if (isOpen) {
            close_shopAudio.play();
        } else {
            open_shopAudio.play();
        }
    }


    /**
     * Plays the click animation (impulses the transform springs)
     * @author Álvaro Fernández Barrero
     */
    #playClickAnimation() {
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
    #onclick() {
        this.#playClickAnimation();
        this.#playClickSfx();

        stats.incrementPoints();
        stats.showPoints();
    }

    /**
     * Updates the lemon's springs and applies them to the lemon's transform
     * @author Álvaro Fernández Barrero
     */
    #update() {
        this.#lemonSpringer.update();
    }

    /**
     * Notifies the lemon to update its state
     * @author Álvaro Fernández Barrero
     */
    onNotify() {
        this.#update();
    }
}