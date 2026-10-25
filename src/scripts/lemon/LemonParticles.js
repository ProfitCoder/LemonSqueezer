import { stats } from "../stats.js";

// A small reusable pool; the browser runs the animations without JS timers.
export class LemonParticles {
    static MAX_PARTICLES = 48;
    static EMISSION_DELAY = 110; // milliseconds

    #lemon;
    #parent;
    #particles = [];
    #lastEmission = -Infinity;

    constructor(lemonElement, particlesParentElement) {
        this.#lemon = lemonElement;
        this.#parent = particlesParentElement;
    }

    spread() {
        if (document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const now = performance.now();
        if (now - this.#lastEmission < LemonParticles.EMISSION_DELAY) return;
        this.#lastEmission = now;

        // Measure once per burst, not once per particle or animation frame.
        const parentBounds = this.#parent.getBoundingClientRect();
        const lemonBounds = this.#lemon.getBoundingClientRect();
        const startX = lemonBounds.left + lemonBounds.width / 2 - parentBounds.left - 6;
        const startY = lemonBounds.top + lemonBounds.height / 2 - parentBounds.top - 6;
        const baseValue = Number(stats.baseValue);
        const amount = Math.min(10, 6 + Math.floor(Math.sqrt(Math.max(0, baseValue || 0))));

        for (let index = 0; index < amount; index++) {
            let particle = this.#particles.find(item => !item.busy);
            if (!particle) {
                if (this.#particles.length >= LemonParticles.MAX_PARTICLES) break;
                const element = document.createElement("div");
                element.className = "particle";
                element.setAttribute("aria-hidden", "true");
                element.style.visibility = "hidden";
                this.#parent.appendChild(element);
                particle = { element, busy: false };
                this.#particles.push(particle);
            }
            this.#animateParticle(particle, startX, startY);
        }
    }

        #animateParticle(particle, startX, startY) {
        particle.busy = true;
        particle.element.style.visibility = "visible";

        // Disparo hacia un lado, con recorrido suficiente para salir del limón.
        const direction = Math.random() < 0.5 ? -1 : 1;
        const distance = 220 + Math.random() * 200;
        const speedX = direction * distance;

        // Sale hacia arriba y después cae por gravedad.
        const speedY = -(180 + Math.random() * 160);
        const gravity = 850;
        const duration = 850 + Math.random() * 250;
        const seconds = duration / 1000;
        const keyframes = [];

        for (let index = 0; index <= 12; index++) {
            const progress = index / 12;
            const time = progress * seconds;

            const x = startX + speedX * time;
            const y = startY + speedY * time
                + 0.5 * gravity * time * time;

            keyframes.push({
                transform: `translate(${x}px, ${y}px)`,
                opacity: 0.65 * (1 - progress * progress),
                offset: progress
            });
        }

        const animation = particle.element.animate(keyframes, {
            duration,
            easing: "linear",
            fill: "none"
        });

        animation.finished.catch(() => {}).then(() => {
            particle.element.style.visibility = "hidden";
            particle.busy = false;
        });
    }
}
