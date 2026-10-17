import { HTMLObjectPooling } from "./HTMLObjectPooling.js";

// ----------------------------------------------
// CLASSES
// ----------------------------------------------

export class HTMLObjectPoolingBuilder
{
    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #poolMethod = undefined;
    #unpoolMethod = undefined;

    #element = undefined;
    #defaultAmount = 0;

    #unpoolTime = 1;

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    /**
     * Defines the method to fire once an element pools
     * @param {function} poolMethod Method to fire when pooling an element
     * @returns The builder instance
     * @author Álvaro Fernández Barrero
     */
    setPoolMethod(poolMethod)
    {
        if (typeof poolMethod == "function")
            this.#poolMethod = poolMethod;
        
        return this;
    }

    /**
     * Defines the method to fire once an element unpools
     * @param {function} unpoolMethod Method to fire when unpooling an element
     * @returns The builder instance
     * @author Álvaro Fernández Barrero
     */
    setUnpoolMethod(unpoolMethod)
    {
        if (typeof unpoolMethod == "function")
            this.#unpoolMethod = unpoolMethod;
        
        return this;
    }

    /**
     * Defines the time to wait to unpool an element after pooling it
     * @param {Number} unpoolTime Time to wait before unpooling a previously pooled element
     * @returns The builder instance
     * @author Álvaro Fernández Barrero
     */
    setUnpoolTime(unpoolTime)
    {
        this.#unpoolTime = typeof unpoolTime === "number" ? unpoolTime : -1;
        return this;
    }

    /**
     * Defines the element to be pooling
     * @param {Object} element Element to pool
     * @returns The builder instance
     * @author Álvaro Fernández Barrero
     */
    setElement(element)
    {
        if (typeof element === "object")
            this.#element = element;

        return this;
    }

    /**
     * Defines the default amount of copied elements to save
     * @param {Number} amount Default amount of copied elements to save
     * @returns The builder instance
     * @author Álvaro Fernández Barrero
     */
    setDefaultAmount(amount)
    {
        this.#defaultAmount = typeof amount === "number" ? Math.abs(amount) : 1;
        return this;
    }

    /**
     * Creates a HTMLObjectPooling instance according to the set arguments
     * @returns The corresponding HTMLObjectPooling instance
     * @author Álvaro Fernández Barrero
     */
    build()
    {
        return new HTMLObjectPooling(this.#poolMethod, this.#unpoolMethod, this.#element, this.#defaultAmount, this.#unpoolTime);
    }
}