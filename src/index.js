import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from "sweetalert2";
import Acciones from "./Acciones.js";
import { atkBasico, atkEspecial } from "./interfaz.js";

const btn_player1 = document.getElementById("btn_player1");
const btn_player2 = document.getElementById("btn_player2");
const player1 = document.getElementById("py1");
const player2 = document.getElementById("py2");
const nombre1 = document.getElementById("player1");
const nombre2 = document.getElementById("player2");
const nombres = document.getElementById("nombres");

const username1 = document.getElementById("username1");
const personaje1 = document.getElementById("personaje1");
const img1 = document.getElementById("img1");

const username2 = document.getElementById("username2");
const personaje2 = document.getElementById("personaje2");
const img2 = document.getElementById("img2");

const panel1 = document.getElementById("panel1");
const panel2 = document.getElementById("panel2");

let pj1 = "", pj2 = "";
let jugador1, jugador2;

const iniciar_jugador1 = () => {
    panel1.classList.remove("d-none");
    username1.innerText = nombre1.value;
    personaje1.innerText = pj1;
    img1.src = `./public/img/${pj1}/base.png`;
    actualizarBarras(jugador1);
}

const iniciar_jugador2 = () => {
    panel2.classList.remove("d-none");
    username2.innerText = nombre2.value;
    personaje2.innerText = pj2;
    img2.src = `./public/img/${pj2}/base.png`;
    actualizarBarras(jugador2);
}

// Actualiza las barras de vida, ki y energía del jugador que se pasa
const actualizarBarras = (jugador) => {
    const id = jugador.getId();

    document.getElementById(`vida${id}`).style.width = `${jugador.getVida()}%`;
    document.getElementById(`vida${id}-txt`).innerText = `${jugador.getVida()}%`;

    document.getElementById(`ki${id}`).style.width = `${jugador.getKi()}%`;
    document.getElementById(`ki${id}-txt`).innerText = `${jugador.getKi()}%`;

    document.getElementById(`energia${id}`).style.width = `${jugador.getEnergia()}%`;
    document.getElementById(`energia${id}-txt`).innerText = `${jugador.getEnergia()}%`;

    document.querySelector(`#btn-py${id} button:nth-child(4) .badge`).innerText = jugador.getSemilla();

    const cd = jugador.getCooldownEspecial();
    document.querySelector(`#btn-py${id} button:nth-child(2) .badge`).innerText = cd > 0 ? cd : "";
}

nombre1.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/, "");
});
nombre2.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]+/, "");
});

const remover_seleccion = (color, ...elementos) => {
    elementos.map((elemento) => {
        elemento.classList.remove("bg-warning");
        elemento.classList.add("bg-" + color);
    });
}

const msj_error = (msj) => {
    Swal.fire({
        icon: "warning",
        title: "Error!",
        text: msj
    });
}

const pantallaInicioCombate = () => {
    document.body.classList.remove("bg-inicio");
    document.body.classList.add("bg-batalla");

    Swal.fire({
        title: "¡INICIA EL COMBATE!",
        text: `${jugador1.getNombre()} (${jugador1.getPersonaje()}) VS ${jugador2.getNombre()} (${jugador2.getPersonaje()})`,
        imageUrl: "./public/img/shenlong.webp",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Shenlong",
        confirmButtonText: "¡A luchar!",
        confirmButtonColor: "#e3880a",
        timer: 2500,
        timerProgressBar: true
    });
}

[...player1.querySelectorAll("img")].map((imagen) => {
    imagen.addEventListener('click', (event) => {
        remover_seleccion("danger", ...player1.querySelectorAll("img"));
        event.target.classList.remove("bg-danger");
        event.target.classList.add("bg-warning");
        pj1 = event.target.alt;
    });
});

[...player2.querySelectorAll("img")].map((imagen) => {
    imagen.addEventListener('click', (event) => {
        remover_seleccion("primary", ...player2.querySelectorAll("img"));
        event.target.classList.remove("bg-primary");
        event.target.classList.add("bg-warning");
        pj2 = event.target.alt;
    });
});

btn_player1.addEventListener("click", () => {
    if (nombre1.value == "") {
        return msj_error("El jugador 1 no ha ingresado un nombre de usuario!");
    } else if (pj1 == "") {
        return msj_error("El jugador 1 debe seleccionar un personaje!");
    }
    jugador1 = new Acciones(nombre1.value, pj1, 1);
    nombre1.disabled = true;
    player1.classList.add("d-none");
    iniciar_jugador1();

    if (jugador1 && jugador2) {
        nombres.classList.add("d-none");
        pantallaInicioCombate();
    }
});

btn_player2.addEventListener("click", () => {
    if (nombre2.value == "") {
        return msj_error("El jugador 2 no ha ingresado un nombre de usuario!");
    } else if (pj2 == "") {
        return msj_error("El jugador 2 debe seleccionar un personaje!");
    }
    jugador2 = new Acciones(nombre2.value, pj2, 2);
    nombre2.disabled = true;
    player2.classList.add("d-none");
    iniciar_jugador2();

    if (jugador1 && jugador2) {
        nombres.classList.add("d-none");
        pantallaInicioCombate();
    }
});

let batallaTerminada = false;

const verificarFinBatalla = () => {
    if (batallaTerminada || !jugador1 || !jugador2) return;

    if (jugador1.getVida() <= 0 || jugador2.getVida() <= 0) {
        batallaTerminada = true;
        const ganador = jugador1.getVida() > 0 ? jugador1 : jugador2;
        const perdedor = jugador1.getVida() <= 0 ? jugador1 : jugador2;

        setTimeout(() => {
            Swal.fire({
                title: "¡FIN DE LA BATALLA!",
                text: `¡${ganador.getNombre()} (${ganador.getPersonaje()}) ha derrotado a ${perdedor.getNombre()} (${perdedor.getPersonaje()})!`,
                imageUrl: `./public/img/${ganador.getPersonaje()}/base.png`,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Ganador",
                confirmButtonText: "Volver al Menú",
                confirmButtonColor: "#e3880a",
                allowOutsideClick: false
            }).then(() => {
                window.location.reload();
            });
        }, 1600);
    }
}

const botonesP1 = [...document.getElementById("btn-py1").querySelectorAll("button")];
botonesP1[0].addEventListener("click", () => {
    if (batallaTerminada || !jugador1 || !jugador2) return;
    atkBasico(jugador1, jugador2);
    actualizarBarras(jugador1);
    actualizarBarras(jugador2);
    verificarFinBatalla();
});
botonesP1[1].addEventListener("click", () => {
    if (batallaTerminada || !jugador1 || !jugador2) return;
    if (jugador1.getCooldownEspecial() > 0) {
        return msj_error(`Debes esperar ${jugador1.getCooldownEspecial()} ${jugador1.getCooldownEspecial() === 1 ? 'movimiento' : 'movimientos'} para usar el ataque especial`);
    }
    atkEspecial(jugador1, jugador2);
    actualizarBarras(jugador1);
    actualizarBarras(jugador2);
    verificarFinBatalla();
});
botonesP1[2].addEventListener("click", () => {
    if (batallaTerminada || !jugador1) return;
    jugador1.cargaEnergia();
    actualizarBarras(jugador1);
});
botonesP1[3].addEventListener("click", () => {
    if (batallaTerminada || !jugador1) return;
    if (jugador1.getSemilla() <= 0) {
        return msj_error("No hay más semillas");
    }
    jugador1.curacion();
    actualizarBarras(jugador1);
});

const botonesP2 = [...document.getElementById("btn-py2").querySelectorAll("button")];
botonesP2[0].addEventListener("click", () => {
    if (batallaTerminada || !jugador1 || !jugador2) return;
    atkBasico(jugador2, jugador1);
    actualizarBarras(jugador1);
    actualizarBarras(jugador2);
    verificarFinBatalla();
});
botonesP2[1].addEventListener("click", () => {
    if (batallaTerminada || !jugador1 || !jugador2) return;
    if (jugador2.getCooldownEspecial() > 0) {
        return msj_error(`Debes esperar ${jugador2.getCooldownEspecial()} ${jugador2.getCooldownEspecial() === 1 ? 'movimiento' : 'movimientos'} para usar el ataque especial`);
    }
    atkEspecial(jugador2, jugador1);
    actualizarBarras(jugador1);
    actualizarBarras(jugador2);
    verificarFinBatalla();
});
botonesP2[2].addEventListener("click", () => {
    if (batallaTerminada || !jugador2) return;
    jugador2.cargaEnergia();
    actualizarBarras(jugador2);
});
botonesP2[3].addEventListener("click", () => {
    if (batallaTerminada || !jugador2) return;
    if (jugador2.getSemilla() <= 0) {
        return msj_error("No hay más semillas");
    }
    jugador2.curacion();
    actualizarBarras(jugador2);
});