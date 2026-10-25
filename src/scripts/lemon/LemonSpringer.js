import { Spring } from "../math/Spring.js";
import { Mouse } from "../input/Mouse.js";

import { clamp } from "../math/MathHelper.js";

// ----------------------------------------------
// CLASS
// ----------------------------------------------

export class LemonSpringer
{
    // ----------------------------------------------
    // STATICS
    // ----------------------------------------------

    static #EPSILON_ANGLE_DEGREES = 1;

    static #MAXIMUM_ANGLE_TO_ROTATE = 15;
    static #MINIMUM_ANGLE_TO_ROTATE = 5;
    static #DIFFERENCE_LIMITS_ANGLES_TO_ROTATE = Math.abs(this.#MAXIMUM_ANGLE_TO_ROTATE - this.#MINIMUM_ANGLE_TO_ROTATE);

    static #DECREASE_SCALE_WHEN_CLICKING = 0.1;

    static #MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER = 10;

    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #lemon = undefined;

    #ClickSpringRotation = new Spring(10, 2, 2);
    #ClickSpringScale = new Spring(1, 0.5, 1, 1);
    #ClickSpringRotationAuto = new Spring(10, 2, 2);
    #ClickSpringScaleAuto = new Spring(1, 0.5, 1, 1);
    #HoverSpringX = new Spring(1, 0.5, 1, 0);
    #HoverSpringY = new Spring(1, 0.5, 1, 0);

    #currentLemonRotation = 0;
    #currentLemonScale = 0;
    #currentOffsetPositionX = 0;
    #currentOffsetPositionY = 0;

    #mouse = undefined;

    // ----------------------------------------------
    // CONSTRUCTORS
    // ----------------------------------------------

    /**
     * Creates a new clickable lemon with the given parameters
     * @param {HTMLElement} lemonElement Lemon's HTML element
     * @author Álvaro Fernández Barrero
     */
    constructor(lemonElement)
    {
        this.#mouse = Mouse.instance;

        this.#lemon = lemonElement;
        this.#lemon.addEventListener("mouseover", () => { this.#onMouseOver(); });
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    /**
     * Callback for the mouseover event
     * @author Álvaro Fernández Barrero
     */
    #onMouseOver()
    {
        this.#HoverSpringX.position += clamp(this.#mouse.directionX, -LemonSpringer.#MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER, LemonSpringer.#MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER);
        this.#HoverSpringY.position += clamp(this.#mouse.directionY, -LemonSpringer.#MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER, LemonSpringer.#MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER);
    }

    /**
     * Applies an impulse to the lemon
     * @author Álvaro Fernández Barrero
     */
    applyImpulse()
    {
        let alpha = LemonSpringer.#MINIMUM_ANGLE_TO_ROTATE + Math.random() * LemonSpringer.#DIFFERENCE_LIMITS_ANGLES_TO_ROTATE;
        if (this.#currentLemonRotation < -LemonSpringer.#EPSILON_ANGLE_DEGREES || Math.random() > 0.5)
            alpha *= -1;

        this.#ClickSpringRotation.position += alpha;
        this.#ClickSpringScale.position -= LemonSpringer.#DECREASE_SCALE_WHEN_CLICKING;
    }

    /**
     * Updates the inner springs
     * @author Álvaro Fernández Barrero
     */
    #updateSprings()
    {
        this.#ClickSpringRotation.update(DELTA_TIME);
        this.#ClickSpringScale.update(DELTA_TIME);
        this.#ClickSpringRotationAuto.update(DELTA_TIME);
        this.#ClickSpringScaleAuto.update(DELTA_TIME);
        this.#HoverSpringX.update(DELTA_TIME);
        this.#HoverSpringY.update(DELTA_TIME);
    }

    /**
     * Sets all springs's values to their variable
     * @author Álvaro Fernández Barrero
     */
    #setSpringValueToVariables()
    {
        this.#currentLemonRotation = this.#ClickSpringRotation.position;
        this.#currentLemonScale = this.#ClickSpringScale.position;
        this.#currentOffsetPositionX = this.#HoverSpringX.position;
        this.#currentOffsetPositionY = this.#HoverSpringY.position;
    }

    /**
     * Updates the lemon's transform according to springs
     * @author Álvaro Fernández Barrero
     */
    update()
    {
        this.#updateSprings();
        this.#setSpringValueToVariables();

        this.#lemon.style.transform = `translate(${this.#currentOffsetPositionX}px, ${this.#currentOffsetPositionY}px) scale(${this.#currentLemonScale}) rotate(${this.#currentLemonRotation}deg)`;
    }
}