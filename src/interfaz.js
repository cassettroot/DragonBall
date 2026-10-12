import Swal from "sweetalert2";

const atributosPersonaje = {
    "Goku": {
        atk_basico: "Kame Hame Ha",
        atk_especial: "Genki Dama",
        fondo: "rgba(234, 238, 7, 0.7)"
    },
    "Vegitto": {
        atk_basico: "Big Bang Attack",
        atk_especial: "Final Kamehameha",
        fondo: "rgba(126, 238, 7, 0.62)"
    },
    "Veguetta": {
        atk_basico: "Big Bang Attack",
        atk_especial: "Final Kamehameha",
        fondo: "rgba(132, 106, 224, 0.44)"
    },
    "Gohan": {
        atk_basico: "Masenko",
        atk_especial: "Kamehameha Supremo",
        fondo: "rgba(34, 185, 250, 0.93)"
    },
    "Trunks": {
        atk_basico: "Burning Attack",
        atk_especial: "Espada Infinita",
        fondo: "rgba(238, 7, 7, 0.94)"
    },
    "Pikoro": {
        atk_basico: "Makankosappo",
        atk_especial: "Explosión Especial",
        fondo: "rgba(201, 28, 244, 0.7)"
    },
    "Cell": {
        atk_basico: "Kamehameha",
        atk_especial: "Cañón Kamehameha",
        fondo: "rgba(223, 66, 192, 0.7)"
    },
    "Gogeta": {
        atk_basico: "Stardust Breaker",
        atk_especial: "Big Bang Kamehameha",
        fondo: "rgba(201, 44, 175, 0.7)"
    }
};

const atkBasico = (j1, j2) => {
    j1.atkBasico(j2);
    j2.setVida(j2.getVida() - 10 < 1 ? 0 : j2.getVida() - 10);
    j2.mostrarEstadisticas();

    Swal.fire({
        text: atributosPersonaje[j1.getPersonaje()]?.atk_basico,
        imageUrl: `./public/img/${j1.getPersonaje()}/basico.png`,
        imageWidth: 400,
        imageHeight: 400,
        position: 'center',
        width: 600,
        color: '#fff',
        background: 'none',
        imageAlt: 'Ataque basico',
        backdrop: atributosPersonaje[j1.getPersonaje()]?.fondo,
        showConfirmButton: false,
        timer: 1500
    });
}

const atkEspecial = (j1, j2) => {
    j1.atkEspecial(j2);
    j2.setVida(j2.getVida() - 20 < 1 ? 0 : j2.getVida() - 20);
    j2.mostrarEstadisticas();

    Swal.fire({
        text: atributosPersonaje[j1.getPersonaje()]?.atk_especial,
        imageUrl: `./public/img/${j1.getPersonaje()}/especial.png`,
        imageWidth: 400,
        imageHeight: 400,
        position: 'center',
        width: 600,
        color: '#fff',
        background: 'none',
        imageAlt: 'Ataque especial',
        backdrop: atributosPersonaje[j1.getPersonaje()]?.fondo,
        showConfirmButton: false,
        timer: 1500
    });
}

const cargaEnergia = (j1) => {
    j1.cargaEnergia();

    Swal.fire({
        text: atributosPersonaje[j1.getPersonaje()]?.energia || "Carga de Ki",
        imageUrl: `./public/img/${j1.getPersonaje()}/energia.png`,
        imageWidth: 400,
        imageHeight: 400,
        position: 'center',
        width: 600,
        color: '#fff',
        background: 'none',
        imageAlt: 'Carga Ki',
        backdrop: atributosPersonaje[j1.getPersonaje()]?.fondo,
        showConfirmButton: false,
        timer: 1500
    });
}

const curacion = (j1) => {
    j1.curacion();

    Swal.fire({
        text: atributosPersonaje[j1.getPersonaje()]?.curacion || "Semilla del Ermitaño",
        imageUrl: `./public/img/${j1.getPersonaje()}/curar.png`,
        imageWidth: 400,
        imageHeight: 400,
        position: 'center',
        width: 600,
        color: '#fff',
        background: 'none',
        imageAlt: 'Curación',
        backdrop: atributosPersonaje[j1.getPersonaje()]?.fondo,
        showConfirmButton: false,
        timer: 1500
    });
}

export { atkBasico, atkEspecial, cargaEnergia, curacion };