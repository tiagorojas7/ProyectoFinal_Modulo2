import { progreso } from "./progreso.js";
export class progresoManager {
  constructor() {
    //ESTE METODO FUE CREADO CON AYUDA DE LA IA, me ayudo a alamcenar los registros para que se muesren al cambiar la url
    const progresosGuardados = localStorage.getItem("gym_progresos");
    this.progresos = progresosGuardados ? JSON.parse(progresosGuardados) : [];

    //ESTE METODO FUE CREADO CON AYUDA DE LA IA , me ayudo a alamcenar los id y que se muestren al cambiar la url
    const ultimoIdGuardado = localStorage.getItem("gym_nextId");
    this.nextId = ultimoIdGuardado ? parseInt(ultimoIdGuardado) : 1;
  }

  /* GENERAMOS TODOS LOS METODOS QUE VAMOS A UTILIZAR */

  //ESTA FUNCION FUE CREADA CON AYUA DE LA IA, para poder guardar los datos y que se muestren al cambiar la url
  guardarEnLocalStorage() {
    localStorage.setItem("gym_progresos", JSON.stringify(this.progresos));
    localStorage.setItem("gym_nextId", this.nextId.toString());
  }

  //1) Agregar un nuevo progreso
  /**
   * Agrega un nuevo progreso a la lista de progresos.
   * @param {string} nombre - El nombre del ejercicio.
   * @param {number} series - El número de series.
   * @param {number} repeticiones - El número de repeticiones.
   * @param {number} peso - El peso utilizado.
   * @returns {void}
   */
  agregarProgreso(nombreEjercicio, series, repeticiones, peso) {
    const nuevoProgreso = new progreso(
      this.nextId++,
      nombreEjercicio,
      series,
      repeticiones,
      peso,
    );
    this.progresos.push(nuevoProgreso);

    this.guardarEnLocalStorage();
  }

  //2) eliminar un progreso existente
  /**
   * Elimina un progreso existente de la lista de progresos.
   * @param {number} id - El ID del progreso a eliminar.
   * @returns {void}
   */
  eliminarProgreso(id) {
    this.progresos = this.progresos.filter((progreso) => progreso.id !== id);
    this.guardarEnLocalStorage();
  }

  //3) editar un progreso existente
  /**
   * Edita un progreso existente en la lista de progresos.
   * @param {number} id - El ID del progreso a editar.
   * @param {number} peso - El nuevo peso utilizado.
   * @param {number} series - El nuevo número de series.
   * @param {number} repeticiones - El nuevo número de repeticiones.
   * @returns {void}
   */
  editarProgreso(id, peso, series, repeticiones) {
    const progreso = this.progresos.find((progreso) => progreso.id === id);
    if (progreso) {
      progreso.peso = peso;
      progreso.series = series;
      progreso.repeticiones = repeticiones;
      this.guardarEnLocalStorage();
    }
  }

  //4) marcar un progreso como superado
  /**
   * Marca un progreso como superado.
   * @param {number} id - El ID del progreso a marcar como superado.
   * @returns {void}
   */
  marcarProgresoSuperado(id) {
    const progreso = this.progresos.find((progreso) => progreso.id === id);
    if (progreso) {
      progreso.superada = true;
      this.guardarEnLocalStorage();
    }
  }

  //5) obtener todos los progresos
  /**
   * Obtiene todos los progresos.
   * @returns {Array} - Un array con todos los progresos.
   */
  obtenerProgresos() {
    return this.progresos;
  }

  //6) obtener los progresos superados
  /**
   * Obtiene los progresos superados.
   * @returns {Array} - Un array con los progresos superados.
   */
  obtenerProgresosSuperados() {
    return this.progresos.filter((progreso) => progreso.superada === true);
  }

  //7) obtener los progresos pendientes
  /**
   * Obtiene los progresos que todavia no fueron superados.
   * @returns {Array} - Un array con los progresos pendientes.
   */
  obtenerProgresosPendientes() {
    return this.progresos.filter((progreso) => progreso.superada === false);
  }
}
