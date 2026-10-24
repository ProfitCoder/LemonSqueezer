import { SFX } from './SFX.js';
/*
Autor: Pablo Manuel Fernandez
Fecha: 16/10/2026
*/

//AUDIOS

const open_shopAudio = new SFX(
    { name: "open_shop.mp3", type: "audio/mpeg" },
    { name: "open_shop.ogg", type: "audio/ogg" }
);

const close_shopAudio = new SFX(
    { name: "close_shop.mp3", type: "audio/mpeg" },
    { name: "close_shop.ogg", type: "audio/ogg" }
);

//FUCNTIONS FOR PLAYING AUDIOS

function playOpenShop(isOpen) {
    if (isOpen) {
        close_shopAudio.play();
    } else {
        open_shopAudio.play();
    }
}



export function prepararMenus() {
    const abrirMejoras = document.getElementById("open-upgrades");
    const cerrarMejoras = document.getElementById("cerrar-upgrades");
    const panelMejoras = document.getElementById("upgrades-panel");

    const botonTienda = document.getElementById("toggle-shop");
    const tienda = document.querySelector(".shop");

    function mostrarMejoras(abierto) {
        if (panelMejoras) {
            panelMejoras.hidden = !abierto;
        }

        document.body.classList.toggle("menu-abierto", abierto);
        abrirMejoras?.setAttribute("aria-expanded", String(abierto));
    }

    function mostrarTienda(abierto) {
        document.body.classList.toggle("shop-open", abierto);

        if (botonTienda) {
            playOpenShop(true);
            botonTienda.textContent = abierto
                ? "✕ Cerrar"
                : "🛒 Tienda";

            botonTienda.setAttribute("aria-expanded", String(abierto));
        }else{
            playOpenShop(false);

        }
    }

    if (tienda) {
        tienda.id = "shop-panel";
        botonTienda?.setAttribute("aria-controls", tienda.id);
    }

    abrirMejoras?.addEventListener("click", () => {
        mostrarTienda(false);
        console.log("holaaa");
        mostrarMejoras(true);
        cerrarMejoras?.focus();
        playOpenShop(false);
    });

    cerrarMejoras?.addEventListener("click", () => {
        mostrarMejoras(false);
        abrirMejoras?.focus();
        console.log("hola");
        playOpenShop(true);

    });

    botonTienda?.addEventListener("click", () => {
        const abierto = document.body.classList.contains("shop-open");

        mostrarMejoras(false);
        mostrarTienda(!abierto);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        if (document.body.classList.contains("shop-open")) {
            mostrarTienda(false);
            botonTienda?.focus();
        } else if (panelMejoras && !panelMejoras.hidden) {
            mostrarMejoras(false);
            abrirMejoras?.focus();
        }
    });

    mostrarTienda(false);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prepararMenus);
} else {
    prepararMenus();
}