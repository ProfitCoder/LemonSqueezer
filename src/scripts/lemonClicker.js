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

// ----------------------------------------------
// VARIABLES
// ----------------------------------------------

const ClickSpringRotation = new Spring(10, 2, 2);
const ClickSpringScale = new Spring(1, 0.5, 1, 1);

const lemon = document.getElementById("lemon");

let currentLemonRotation = 0;
let currentLemonScale = 0;

// ----------------------------------------------
// METHODS
// ----------------------------------------------

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

// ----------------------------------------------
// EVENTS
// ----------------------------------------------

lemon.addEventListener("mouseover", () => {
    // TODO: hover animation
});

lemon.addEventListener("click", () => {
    stats.incrementPoints();
    playClickAnimation();
});

setInterval(
    () => {
        ClickSpringRotation.update(DELTA_TIME);
        ClickSpringScale.update(DELTA_TIME);

        currentLemonRotation = ClickSpringRotation.position;
        currentLemonScale = ClickSpringScale.position;

        lemon.style.transform = `scale(${currentLemonScale}) rotate(${currentLemonRotation}deg)`;
    },
    DELTA_TIME
);

//
//STARTING 
//

printAllUpgrades("pasive", pasiveUpgradeList);
