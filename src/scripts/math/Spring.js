export class Spring
{
    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #k = 0;
    #mass = 0;
    #beta = 0;

    #target = 0;
    #velocity = 0;
    #position = 0;

    #omega = 0;
    #zeta = 0;
    #omegaZeta = 0;

    // ----------------------------------------------
    // CONSTRUCTORS
    // ----------------------------------------------

    /**
     * Creates a new spring with the given parameters
     * @param {Number} k 
     * @param {Number} mass 
     * @param {Number} beta 
     * @param {Number} target 
     * @author Álvaro Fernández Barrero
     */
    constructor(k, mass, beta, target = 0)
    {
        this.#k = k;
        this.#mass = mass;
        this.#beta = beta;

        this.#target = target;
        this.#position = target;

        this.#omega = Math.sqrt(this.#k / this.#mass);
        this.#zeta = Math.min(this.#beta / (2 * Math.sqrt(this.#k * this.#mass)), 1);
        this.#omegaZeta = this.#omega * this.#zeta;
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    /**
     * Updates the spring's position
     * @param {Number} deltaTime Time passed since the previous frame
     * @author Álvaro Fernández Barrero
     */
    update(deltaTime)
    {
        let a = this.#position - this.#target;

        if (Math.abs(a) < Number.EPSILON)
            return;

        let omegaRoot = this.#omega * Math.sqrt(1 - this.#zeta * this.#zeta);
        let omegaRootDeltaTime = omegaRoot * deltaTime;

        let exponential = Math.exp(-this.#omegaZeta * deltaTime);
        let cosine = Math.cos(omegaRootDeltaTime);
        let sine = Math.sin(omegaRootDeltaTime);

        let b = (this.#velocity - (a * this.#omegaZeta)) / omegaRoot;

        this.#position = (a * cosine + b * sine) * exponential + this.#target;
        this.#velocity = -exponential * ((a * this.#omegaZeta - b * omegaRoot) * cosine + (a * omegaRoot + b * this.#omegaZeta) * sine)
    }

    // ----------------------------------------------
    // GETTERS & SETTERS
    // ----------------------------------------------

    get position()
    {
        return this.#position;
    }

    set position(position)
    {
        this.#position = position;
    }

    get target()
    {
        return this.#target;
    }

    set target(target)
    {
        this.#target = target;
    }
}