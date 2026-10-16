// ----------------------------------------------
// CONSTANTS
// ----------------------------------------------

const FPS = 45;
const DELTA_TIME = 1 / FPS;

const EPSILON_ANGLE_DEGREES = 1;

const MAXIMUM_ANGLE_TO_ROTATE = 15;
const MINIMUM_ANGLE_TO_ROTATE = 5;
const DIFFERENCE_LIMITS_ANGLES_TO_ROTATE = Math.abs(MAXIMUM_ANGLE_TO_ROTATE - MINIMUM_ANGLE_TO_ROTATE);

const DECREASE_SCALE_WHEN_CLICKING = 0.1;

const MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER = 10;

const MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK = 0;
const MAXIMUM_AMOUNT_OF_PARTICLES_PER_CLICK = 5;
const LIMINTS_AMOUNT_OF_PARTICLES_DIFFERENCE = Math.min(MAXIMUM_AMOUNT_OF_PARTICLES_PER_CLICK - MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK);

const PARTICLE_CLASS_NAME = "particle";
const PARTICLES_SPEED = 0.5;

const PARTICLE_MINIMUM_MOTION = 120;
const PARTICLE_MAXIMUM_MOTION = 150;
const PARTICLE_CURVATURE = 70;

// ----------------------------------------------
// VARIABLES
// ----------------------------------------------

const lemon = document.getElementById("lemon");
const particlesParent = document.getElementById("lemon-container");

const ClickSpringRotation = new Spring(10, 2, 2);
const ClickSpringScale = new Spring(1, 0.5, 1, 1);
const HoverSpringX = new Spring(1, 0.5, 1, 0);
const HoverSpringY = new Spring(1, 0.5, 1, 0);

let currentLemonRotation = 0;
let currentLemonScale = 0;
let currentOffsetPositionX = 0;
let currentOffsetPositionY = 0;

let lastMouseX = undefined;
let lastMouseY = undefined;
let mouseDirectionX = 0;
let mouseDirectionY = 0;

let lemonContainerCoordinates = particlesParent.getBoundingClientRect();
let lemonCoordinates = lemon.getBoundingClientRect();

let lemonCoordinatesX = lemonCoordinates.left + (lemonCoordinates.right - lemonCoordinates.left) / 2 - lemonContainerCoordinates.left;
let lemonCoordinatesY = lemonContainerCoordinates.top + (lemonCoordinates.top - lemonCoordinates.bottom) / 2 - lemonCoordinates.top;

// ----------------------------------------------
// METHODS
// ----------------------------------------------

/**
 * Clamps the given number between the minimum and the maximum offered
 * @param {Number} x Value to clamp
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 * @returns The given number clamped between the minimum and maximum values offered
 * @author Álvaro Fernández Barrero
 */
const clamp = (x, min, max) => Math.max(min, Math.min(x, max));

/**
 * Interpolates from a to b according to t
 * @param {Number} a Starting number
 * @param {Number} b Goal number
 * @param {Number} t Progress
 * @returns A interpolated value between the two giving boundaries a and b
 * @author Álvaro Fernández Barrero
 */
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Gets a random amount of particles
 * @returns A random amount of particles
 * @author Álvaro Fernández Barrero
 */
const getAmountParticles = () => MINIMUM_AMOUNT_OF_PARTICLES_PER_CLICK + Math.floor(Math.random() * LIMINTS_AMOUNT_OF_PARTICLES_DIFFERENCE);

/**
 * Creates a new drop element
 * @returns The new particle created as a HTML element
 * @author Álvaro Fernández Barrero
 */
function createDrop()
{
    let particle = document.createElement("div");
    particle.className = PARTICLE_CLASS_NAME;
    particle.style.margin = "0 auto";
    particle.style.zIndex = -500;
    particle.style.position = "absolute";
    particlesParent.appendChild(particle);

    return particle;
}

/**
 * Throw a lemon's drop
 * @author Álvaro Fernández Barrero
 */
async function throwDrop()
{
    let particle = createDrop();

    let offsetX = PARTICLE_MINIMUM_MOTION + Math.floor(Math.random() * PARTICLE_MAXIMUM_MOTION);
    if (Math.random() > 0.5)
        offsetX *= -1;

    let offsetY = PARTICLE_MINIMUM_MOTION + Math.floor(Math.random() * PARTICLE_MAXIMUM_MOTION);
    if (Math.random() > 0.5)
        offsetY *= -1;

    let goalX = lemonCoordinatesX + offsetX;
    let goalY = lemonCoordinatesY + offsetY;

    let t = 0;  

    while (t < 1)
    {
        await new Promise(resolve => setTimeout(resolve, DELTA_TIME)).then(() => t += DELTA_TIME * PARTICLES_SPEED);

        let newX = lerp(lemonCoordinatesX, goalX, t);
        let newY = lerp(lemonCoordinatesY, goalY, t);
        
        if (newY > 0)
            newY -= Math.sin(t * Math.PI) * PARTICLE_CURVATURE;
        
        particle.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    particle.remove();
}

/**
 * Spreads lemon's particles
 * @author Álvaro Fernández Barrero
 */
function spreadParticles()
{
    let particlesAmount = getAmountParticles();
    if (particlesAmount <= 0)
        return;

    for (let i = 0; i < particlesAmount; i++)
        throwDrop();
}

/**
 * Plays the click animation (impulses the transform springs)
 * @author Álvaro Fernández Barrero
 */
function playClickAnimation()
{
    let alpha = MINIMUM_ANGLE_TO_ROTATE + Math.random() * DIFFERENCE_LIMITS_ANGLES_TO_ROTATE;
    if (currentLemonRotation < -EPSILON_ANGLE_DEGREES || Math.random() > 0.5)
        alpha *= -1;

    ClickSpringRotation.position += alpha;
    ClickSpringScale.position -= DECREASE_SCALE_WHEN_CLICKING;

    spreadParticles();
}

/**
 * Updates the mouse's information
 * @param {Object} data Object with the mouse's information 
 * @author Álvaro Fernández Barrero
 */
function updateMouseData(data)
{
    let newMouseX = data.clientX;
    let newMouseY = data.clientY;

    if (lastMouseX !== undefined && lastMouseY !== undefined)
    {
        mouseDirectionX = lastMouseX - newMouseX;
        mouseDirectionY = lastMouseY - newMouseY;
    }
    
    lastMouseX = newMouseX;
    lastMouseY = newMouseY;
}

// ----------------------------------------------
// EVENTS
// ----------------------------------------------

document.onmousemove = updateMouseData;

lemon.addEventListener("mouseover", () => {
    HoverSpringX.position += clamp(mouseDirectionX, -MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER, MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER);
    HoverSpringY.position += clamp(mouseDirectionY, -MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER, MAXIMUM_IMPULSE_WHEN_MOUSE_IS_OVER);
});

lemon.addEventListener("click", () => {
    stats.incrementPoints();
    playClickAnimation();
});

setInterval(
    () => {
        ClickSpringRotation.update(DELTA_TIME);
        ClickSpringScale.update(DELTA_TIME);
        HoverSpringX.update(DELTA_TIME);
        HoverSpringY.update(DELTA_TIME);
        
        currentLemonRotation = ClickSpringRotation.position;
        currentLemonScale = ClickSpringScale.position;
        currentOffsetPositionX = HoverSpringX.position;
        currentOffsetPositionY = HoverSpringY.position;
        
        lemon.style.transform = `translate(${currentOffsetPositionX}px, ${currentOffsetPositionY}px) scale(${currentLemonScale}) rotate(${currentLemonRotation}deg)`;
    },
    DELTA_TIME
);

//
//STARTING 
//

printAllUpgrades("pasive", pasiveUpgradeList);
