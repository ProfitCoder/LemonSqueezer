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

// ----------------------------------------------
// VARIABLES
// ----------------------------------------------

const lemon = document.getElementById("lemon");

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