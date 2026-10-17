import { Spring } from "../math/Spring.js";
import { HTMLObjectPoolingBuilder } from "../HTMLObjectPooling/HTMLObjectPoolingBuilder.js";
import { clamp, lerp } from "../math/MathHelper.js";
import { Mouse } from "../input/Mouse.js";
import { stats } from "../stats.js";

// ----------------------------------------------
// CLASS
// ----------------------------------------------

export class Lemon
{
    static #FPS = 45;
    static #DELTA_TIME = 1 / this.#FPS;

    static #EPSILON_ANGLE_DEGREES = 1;

    static #MAXIMUM_ANGLE_TO_ROTATE = 15;
    static #MINIMUM_ANGLE_TO_ROTATE = 5;
    static #DIFFERENCE_LIMITS_ANGLES_TO_ROTATE = Math.abs(this.#MAXIMUM_ANGLE_TO_ROTATE - this.#MINIMUM_ANGLE_TO_ROTATE);

    static #DECREASE_SCALE_WHEN_CLICKING = 0.1;

    static #MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER = 10;

    static #MINIMUM_DELAY_BETWEEN_CLICKS_TO_RUN_ANIMATIONS = 0.1;
    static #MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK = 0;
    static #MAXIMUM_AMOUNT_OF_PARTICLES_PER_CLICK = 5;
    static #LIMINTS_AMOUNT_OF_PARTICLES_DIFFERENCE = Math.min(this.#MAXIMUM_AMOUNT_OF_PARTICLES_PER_CLICK - this.#MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK);

    static #PARTICLE_CLASS_NAME = "particle";
    static #PARTICLES_SPEED = 0.5;

    static #PARTICLE_MINIMUM_MOTION = 120;
    static #PARTICLE_MAXIMUM_MOTION = 150;
    static #PARTICLE_CURVATURE = 70;

    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #htmlObjectPooling = undefined;

    #lemon = undefined;
    #particlesParent = undefined;

    #lemonContainerCoordinates = undefined;
    #lemonCoordinates = undefined;

    #lemonCoordinatesX = undefined;
    #lemonCoordinatesY = undefined;

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

    #lastTimeClicked = 0;

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
        this.#mouse = Mouse.instance;

        this.#lemon = lemonElement;
        this.#particlesParent = particlesParentElement;

        this.#setLemonCoordinates();

        this.#htmlObjectPooling = new HTMLObjectPoolingBuilder()
                                .setElement(this.#createDrop())
                                .setDefaultAmount(5)
                                .setUnpoolTime(-1)
                                .setPoolMethod(particle => this.#throwDrop(particle))
                                .setUnpoolMethod(particle => particle.style.opacity = 0)
                                .build();

        this.#lemon.addEventListener("click", () => { this.#onclick(); });
        this.#lemon.addEventListener("mouseover", () => { this.#onMouseOver(); });

        window.addEventListener("resize", () => {this.#setLemonCoordinates()})
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    /**
     * Gets a random amount of particles
     * @returns A random amount of particles
     * @author Álvaro Fernández Barrero
     */
    static #getAmountParticles = () => Lemon.#MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK + Math.floor(Math.random() * Lemon.#LIMINTS_AMOUNT_OF_PARTICLES_DIFFERENCE);

    /**
     * Computes a random offset for the drop's motion
     * @returns The random offset for the drop's motion
     * @author Álvaro Fernández Barrero
     */
    static #computeDropOffset()
    {
        let offset = Lemon.#PARTICLE_MINIMUM_MOTION + Math.floor(Math.random() * Lemon.#PARTICLE_MAXIMUM_MOTION);
        if (Math.random() > 0.5)
            offset *= -1;

        return offset;
    }

    /**
     * Throw a lemon's drop
     * @author Álvaro Fernández Barrero
     */
    async #throwDrop(particle)
    {
        particle.style.opacity = 1;
        particle.style.transform = `translate(${this.#lemonCoordinatesX}px, ${this.#lemonCoordinatesY}px)`;

        let offsetX = Lemon.#computeDropOffset();
        let offsetY = Lemon.#computeDropOffset();

        let goalX = this.#lemonCoordinatesX + offsetX;
        let goalY = this.#lemonCoordinatesY + offsetY;

        let t = 0;  

        while (t < 1)
        {
            await new Promise(resolve => setTimeout(resolve, DELTA_TIME)).then(() => t += DELTA_TIME * Lemon.#PARTICLES_SPEED);

            let newX = lerp(this.#lemonCoordinatesX, goalX, t);
            let newY = lerp(this.#lemonCoordinatesY, goalY, t);
            
            if (newY > 0)
                newY -= Math.sin(t * Math.PI) * Lemon.#PARTICLE_CURVATURE;
            
            particle.style.transform = `translate(${newX}px, ${newY}px)`;
        }

        this.#htmlObjectPooling.unpool(particle);
    }

    /**
    * Creates a new drop element
    * @returns The new particle created as a HTML element
    * @author Álvaro Fernández Barrero
    */
    #createDrop()
    {
        let particle = document.createElement("div");
        particle.className = Lemon.#PARTICLE_CLASS_NAME;
        particle.style.margin = "0 auto";
        particle.style.opacity = 0;
        particle.style.zIndex = -500;
        particle.style.position = "absolute";
        this.#particlesParent.appendChild(particle);

        return particle;
    }

    /**
     * Spreads lemon's particles
     * @author Álvaro Fernández Barrero
     */
    #spreadParticles()
    {
        let particlesAmount = Lemon.#getAmountParticles();
        if (particlesAmount <= 0)
            return;

        for (let i = 0; i < particlesAmount; i++)
            this.#htmlObjectPooling.pool();
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

        let alpha = Lemon.#MINIMUM_ANGLE_TO_ROTATE + Math.random() * Lemon.#DIFFERENCE_LIMITS_ANGLES_TO_ROTATE;
        if (this.#currentLemonRotation < -Lemon.#EPSILON_ANGLE_DEGREES || Math.random() > 0.5)
            alpha *= -1;

        this.#ClickSpringRotation.position += alpha;
        this.#ClickSpringScale.position -= Lemon.#DECREASE_SCALE_WHEN_CLICKING;

        this.#spreadParticles();
    }
    playClickAnimationAuto() {
        this.#playClickAnimation();
    }


    /**
     * Sets the lemon's coordinates in screen
     * @author Álvaro Fernández Barrero
     */
    #setLemonCoordinates()
    {
        this.#lemonContainerCoordinates = this.#particlesParent.getBoundingClientRect();
        this.#lemonCoordinates = this.#lemon.getBoundingClientRect();

        this.#lemonCoordinatesX = this.#lemonCoordinates.left + (this.#lemonCoordinates.right - this.#lemonCoordinates.left) / 2 - this.#lemonContainerCoordinates.left;
        this.#lemonCoordinatesY = this.#lemonContainerCoordinates.top + (this.#lemonCoordinates.top - this.#lemonCoordinates.bottom) / 2 - this.#lemonCoordinates.top;
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
     * Callback for the mouseover event
     * @author Álvaro Fernández Barrero
     */
    #onMouseOver()
    {
        this.#HoverSpringX.position += clamp(this.#mouse.directionX, -Lemon.#MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER, Lemon.#MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER);
        this.#HoverSpringY.position += clamp(this.#mouse.directionY, -Lemon.#MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER, Lemon.#MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER);
    }

    /**
     * Updates the lemon's springs and applies them to the lemon's transform
     * @author Álvaro Fernández Barrero
     */
    #update()
    {
        this.#ClickSpringRotation.update(DELTA_TIME);
        this.#ClickSpringScale.update(DELTA_TIME);
        this.#ClickSpringRotationAuto.update(DELTA_TIME);
        this.#ClickSpringScaleAuto.update(DELTA_TIME);
        this.#HoverSpringX.update(DELTA_TIME);
        this.#HoverSpringY.update(DELTA_TIME);

        this.#currentLemonRotation = this.#ClickSpringRotation.position;
        this.#currentLemonScale = this.#ClickSpringScale.position;
        this.#currentOffsetPositionX = this.#HoverSpringX.position;
        this.#currentOffsetPositionY = this.#HoverSpringY.position;

        this.#lemon.style.transform = `translate(${this.#currentOffsetPositionX}px, ${this.#currentOffsetPositionY}px) scale(${this.#currentLemonScale}) rotate(${this.#currentLemonRotation}deg)`;
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