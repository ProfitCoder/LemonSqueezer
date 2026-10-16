/*
Autor: Pablo Manuel Fernandez
Fecha: 16/10/2026
*/

const abrir = document.getElementById("abrir-mejoras");
const cerrar = document.getElementById("cerrar-mejoras");
const panel = document.getElementById("panel-mejoras");

// Abre el panel y lo mantiene abierto hasta cerrarlo.
abrir.addEventListener("click", () => {
    panel.hidden = false;

    // Reserva el espacio del panel izquierdo.
    document.body.classList.add("menu-abierto");

    abrir.setAttribute("aria-expanded", "true");
    cerrar.focus();
});

cerrar.addEventListener("click", () => {
    panel.hidden = true;

    // Recupera el espacio cuando se cierra.
    document.body.classList.remove("menu-abierto");

    abrir.setAttribute("aria-expanded", "false");
    abrir.focus();
});