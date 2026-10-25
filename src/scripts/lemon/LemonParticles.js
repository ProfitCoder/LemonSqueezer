import { HTMLObjectPoolingBuilder } from "../HTMLObjectPooling/HTMLObjectPoolingBuilder.js";

import { stats } from "../stats.js";
import { lerp } from "../math/MathHelper.js";

// ----------------------------------------------
// CLASS
// ----------------------------------------------

export class LemonParticles
{
    // ----------------------------------------------
    // STATICS
    // ----------------------------------------------

    static #MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK = 3;
    static #MAXIMUM_AMOUNT_OF_PARTICLES_PER_CLICK = 20;
    static #LIMINTS_AMOUNT_OF_PARTICLES_DIFFERENCE = Math.abs(this.#MAXIMUM_AMOUNT_OF_PARTICLES_PER_CLICK - this.#MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK);

    static #PARTICLE_CLASS_NAME = "particle";
    static #PARTICLES_SPEED = 0.35;

    static #PARTICLE_MINIMUM_MOTION = 0;
    static #PARTICLE_MAXIMUM_MOTION = 400;
    static #PARTICLE_CURVATURE = 100;

    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #lemon = undefined;
    #particlesParent = undefined;

    #htmlObjectPooling = undefined;

    #lemonContainerCoordinates = undefined;
    #lemonCoordinates = undefined;

    #lemonCoordinatesX = undefined;
    #lemonCoordinatesY = undefined;

    // ----------------------------------------------
    // CONSTRUCTORS
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
        this.#particlesParent = particlesParentElement;

        this.#htmlObjectPooling = new HTMLObjectPoolingBuilder()
                                .setElement(this.#createDrop())
                                .setDefaultAmount(5)
                                .setUnpoolTime(-1)
                                .setPoolMethod(particle => this.#throwDrop(particle))
                                .setUnpoolMethod(particle => particle.style.opacity = 0)
                                .build();

        this.#setLemonCoordinates();

        window.addEventListener("resize", () => { this.#setLemonCoordinates(); });
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    /**
     * Gets a random amount of particles
     * @returns A random amount of particles
     * @author Álvaro Fernández Barrero
     */
    static #getAmountParticles = () => {
        let multiplier = Math.sqrt(1 + stats.baseValue * 0.1);
        let randomAmount = (LemonParticles.#MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK + Math.floor(Math.random() * LemonParticles.#LIMINTS_AMOUNT_OF_PARTICLES_DIFFERENCE));
        
        return Math.floor(multiplier * randomAmount);
    }

    /**
     * Computes a random offset for the drop's motion
     * @returns The random offset for the drop's motion
     * @author Álvaro Fernández Barrero
     */
    static #computeDropOffset()
    {
        let offset = LemonParticles.#PARTICLE_MINIMUM_MOTION + Math.floor(Math.random() * LemonParticles.#PARTICLE_MAXIMUM_MOTION);
        if (Math.random() > 0.5)
            offset *= -1;

        return offset;
    }

    /**
     * Prepares a particle for interpolating it
     * @param {HTMLElement} particle Particle to prepare
     * @author Álvaro Fernández Barrero
     */
    #prepareParticleForInterpolation(particle)
    {
        particle.style.opacity = 1;
        particle.style.transform = `translate(${this.#lemonCoordinatesX}px, ${this.#lemonCoordinatesY}px)`;
    }

    /**
     * Computes a interpolation's interpolation
     * @param {HTMLElement} particle Particle to move 
     * @param {Number} t Time
     * @param {Number} lifeTime Particle's lifetime 
     * @param {Number} goalX Target position X
     * @param {Number} goalY Target position Y
     * @param {Number} offsetY Offset Z
     * @author Álvaro Fernández Barrero
     */
    #computeInterpolation(particle, t, lifeTime, goalX, goalY, offsetY)
    {
        let alpha = t / lifeTime;

        let newX = lerp(this.#lemonCoordinatesX, goalX, alpha);
        let newY = lerp(this.#lemonCoordinatesY, goalY, alpha);
        
        if (offsetY < 0)
            newY -= Math.sin(Math.min(alpha * Math.PI, Math.PI)) * LemonParticles.#PARTICLE_CURVATURE;
        
        particle.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    /**
     * Throw a lemon's drop
     * @author Álvaro Fernández Barrero
     */
    async #throwDrop(particle)
    {
        this.#prepareParticleForInterpolation(particle);
        
        let t = 0;  
        let lifeTime = 1 + Math.random() * 2;

        let offsetX = LemonParticles.#computeDropOffset();
        let offsetY = LemonParticles.#computeDropOffset();

        if (offsetX === 0 && offsetY === 0)
            offsetX = LemonParticles.#PARTICLE_MAXIMUM_MOTION;

        let goalX = this.#lemonCoordinatesX + offsetX * lifeTime;
        let goalY = this.#lemonCoordinatesY + (offsetY < 0 ? offsetY : offsetY * 2) * lifeTime;


        while (t < lifeTime)
        {
            await new Promise(resolve => setTimeout(resolve, DELTA_TIME)).then(() => t += DELTA_TIME * LemonParticles.#PARTICLES_SPEED);
            this.#computeInterpolation(particle, t, lifeTime, goalX, goalY, offsetY);
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
        const particle = document.createElement("div");
        particle.className = LemonParticles.#PARTICLE_CLASS_NAME;
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
    spread()
    {
        let particlesAmount = LemonParticles.#getAmountParticles();
        if (particlesAmount <= 0)
            return;

        for (let i = 0; i < particlesAmount; i++)
            this.#htmlObjectPooling.pool();
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
}