/*
Autor: Pablo Manuel Fernandez
Fecha: 16/10/2026
*/

function prepararMenus() {
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
            botonTienda.textContent = abierto
                ? "✕ Cerrar"
                : "🛒 Tienda";

            botonTienda.setAttribute("aria-expanded", String(abierto));
        }
    }

    if (tienda) {
        tienda.id = "shop-panel";
        botonTienda?.setAttribute("aria-controls", tienda.id);
    }

    abrirMejoras?.addEventListener("click", () => {
        mostrarTienda(false);
        mostrarMejoras(true);
        cerrarMejoras?.focus();
    });

    cerrarMejoras?.addEventListener("click", () => {
        mostrarMejoras(false);
        abrirMejoras?.focus();
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