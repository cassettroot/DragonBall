import Personaje from "./Personaje.js";

class Acciones extends Personaje{
    constructor(nombre, personaje, id){
        super(nombre, personaje, id);
    }

    atkBasico(rival){
        this.setEnergia(parseInt(this.getEnergia() - 5));
        this.setKi(parseInt(this.getKi() - 10));
        this.reducirCooldown();
        this.mostrarEstadisticas();
    }

    atkEspecial(rival){
        this.setEnergia(parseInt(this.getEnergia() - 15));
        this.setKi(parseInt(this.getKi() - 20));
        this.setCooldownEspecial(2);
        this.mostrarEstadisticas();
    }

    curacion(){
        if (this.getSemilla() <= 0) return;
        this.setEnergia(100);
        this.setKi(100);
        this.setVida(100);
        this.setSemilla(this.getSemilla() - 1);
        this.reducirCooldown();
        this.mostrarEstadisticas();
    }

    cargaEnergia(){
        this.setEnergia((this.getEnergia() + 15) > 100 ? 100 : (this.getEnergia() + 15));
        this.setKi((this.getKi() + 10) > 100 ? 100 : (this.getKi() + 10));
        this.reducirCooldown();
        this.mostrarEstadisticas();
    }

    defensa(){

    }
}

export default Acciones;