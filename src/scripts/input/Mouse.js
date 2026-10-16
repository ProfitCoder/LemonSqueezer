// ----------------------------------------------
// CLASSES
// ----------------------------------------------

export class Mouse
{
    // ----------------------------------------------
    // STATIC FIELDS
    // ----------------------------------------------

    static instanceSingleton = undefined;

    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------
    
    #x = 0;
    #y = 0;

    #lastX = 0;
    #lastY = 0;

    #directionX = 0;
    #directionY = 0;

    // ----------------------------------------------
    // CONSTRUCTOR
    // ----------------------------------------------

    constructor()
    {
        if (Mouse.instanceSingleton)
            return Mouse.instanceSingleton;

        Mouse.instanceSingleton = this;

        document.addEventListener("mousemove", this.#updateMouseCoordinates.bind(this));
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    #updateMouseCoordinates(event)
    {
        this.#lastX = this.#x;
        this.#lastY = this.#y;

        this.#x = event.clientX;
        this.#y = event.clientY;

        this.#directionX = this.#x - this.#lastX;
        this.#directionY = this.#y - this.#lastY;
    }

    // ----------------------------------------------
    // GETTERS & SETTERS
    // ----------------------------------------------

    static get instance()
    {
        return Mouse.instanceSingleton || new Mouse();
    }

    get x()
    {
        return this.#x;
    }

    get y()
    {
        return this.#y;
    }

    get directionX()
    {
        return this.#directionX;
    }

    get directionY()
    {
        return this.#directionY;
    }
}