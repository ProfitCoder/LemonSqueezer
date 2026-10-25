import { Mouse } from "../input/Mouse.js";

function createSpring(target = 0) {
    return { position: target, velocity: 0, target };
}

// Small substeps keep the bounce stable at different display refresh rates.
function advanceSpring(spring, seconds, stiffness, damping) {
    const steps = Math.max(1, Math.ceil(seconds * 120));
    const step = seconds / steps;
    for (let index = 0; index < steps; index++) {
        const acceleration = (spring.target - spring.position) * stiffness
            - spring.velocity * damping;
        spring.velocity += acceleration * step;
        spring.position += spring.velocity * step;
    }
    if (Math.abs(spring.position - spring.target) < 0.001
        && Math.abs(spring.velocity) < 0.001) {
        spring.position = spring.target;
        spring.velocity = 0;
    }
}

export class LemonSpringer {
    #lemon;
    #mouse = Mouse.instance;
    #rotation = createSpring();
    #scale = createSpring(1);
    #jump = createSpring();
    #hoverX = createSpring();
    #hoverY = createSpring();
    #moving = false;
    #reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    constructor(lemonElement) {
        this.#lemon = lemonElement;
        this.#lemon.addEventListener("mouseover", () => {
            if (this.#reducedMotion.matches) return;
            this.#hoverX.position = Math.max(-10, Math.min(10, this.#mouse.directionX));
            this.#hoverY.position = Math.max(-10, Math.min(10, this.#mouse.directionY));
            this.#moving = true;
        });
    }

    applyImpulse() {
        if (this.#reducedMotion.matches) return;
        const direction = this.#rotation.position > 0 ? -1 : 1;
        this.#rotation.position = direction * (20 + Math.random() * 10);
        this.#rotation.velocity = direction * 60;
        this.#scale.position = 0.80;
        this.#scale.velocity = 0;
        this.#jump.position = -24;
        this.#jump.velocity = -180;
        this.#moving = true;
    }

    update(deltaSeconds = 1 / 60) {
        if (!this.#moving) return;
        if (this.#reducedMotion.matches) {
            this.#lemon.style.transform = "none";
            this.#moving = false;
            return;
        }
        const seconds = Math.max(0, Math.min(0.05, deltaSeconds));
        advanceSpring(this.#rotation, seconds, 180, 12);
        advanceSpring(this.#scale, seconds, 260, 13);
        advanceSpring(this.#jump, seconds, 260, 13);
        advanceSpring(this.#hoverX, seconds, 180, 16);
        advanceSpring(this.#hoverY, seconds, 180, 16);

        this.#lemon.style.transform =
            `translate(${this.#hoverX.position}px, ${this.#hoverY.position + this.#jump.position}px) `
            + `scale(${this.#scale.position}) rotate(${this.#rotation.position}deg)`;

        this.#moving = [this.#rotation, this.#scale, this.#jump, this.#hoverX, this.#hoverY]
            .some(spring => spring.position !== spring.target || spring.velocity !== 0);
        if (!this.#moving) this.#lemon.style.transform = "none";
    }
}
