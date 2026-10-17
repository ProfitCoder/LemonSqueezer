// ----------------------------------------------
// CLASSES
// ----------------------------------------------

export class HTMLObjectPooling
{
    // ----------------------------------------------
    // ATTRIBUTES
    // ----------------------------------------------

    #poolMethod = undefined;
    #unpoolMethod = undefined;

    #storedElements = [];
    #inScreenElements = [];

    #unpoolTime = -1;

    // ----------------------------------------------
    // CONSTRUCTORS
    // ----------------------------------------------
    
    /**
     * Creates a new object pooling for HTML elemenets
     * @param {function} poolMethod Method to run when pooling an element
     * @param {function} unpoolMethod Method to run when unpooling an element
     * @param {Object} element Element to pool and unpool
     * @param {Number} defaultAmount Default amount of element's copies
     * @param {Number} unpoolTime Time to wait after pooling an element to unpool it
     * @author Álvaro Fernández Barrero
     */
    constructor(poolMethod, unpoolMethod, element, defaultAmount = 5, unpoolTime)
    {
        this.#poolMethod = poolMethod;
        this.#unpoolMethod = unpoolMethod;

        this.#storedElements.push(element);
        for (let i = 0; i < Math.abs(defaultAmount) - 1; i++)
           this.#storedElements.push(this.#cloneElement());

        this.#unpoolTime = unpoolTime || -1;
    }

    // ----------------------------------------------
    // METHODS
    // ----------------------------------------------

    /**
     * Copies the element
     * @returns A copy of the HTML element
     * @author Álvaro Fernández Barrero
     */
    #cloneElement()
    {
        let copy = this.#storedElements[0].cloneNode(true);
        this.#storedElements[0].parentElement.appendChild(copy);

        return copy;
    }

    /**
     * Pools an element
     * @author Álvaro Fernández Barrero
     */
    pool()
    {
        let element = this.#storedElements.length === 1 ? this.#cloneElement() : this.#storedElements.pop();
        this.#inScreenElements.push(element);

        if (typeof this.#poolMethod === "function")
            this.#poolMethod(element);

        if (this.#unpoolTime > 0)
            setTimeout(() => this.unpool(element), this.#unpoolTime * 1e3);
    }

    /**
     * Unpools the given element
     * @param {Object | Number} element Element to unpool
     * @author Álvaro Fernández Barrero 
     */
    unpool(element)
    {
        let index = typeof element === "number" ? element : this.#inScreenElements.indexOf(element);
        element = typeof element === "number" ? this.#inScreenElements[index] : element;

        if (typeof this.#unpoolMethod === "function")
            this.#unpoolMethod(element);

        this.#storedElements.push(element);
        this.#inScreenElements = this.#inScreenElements.filter(particle => particle !== element);
    }
}