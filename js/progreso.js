export class progreso {
  constructor(
    id,
    nombreEjercicio,
    series,
    repeticiones,
    peso,
    superada = false,
  ) {
    this.nombreEjercicio = nombreEjercicio;
    this.series = series;
    this.repeticiones = repeticiones;
    this.peso = peso;
    this.superada = superada;
    this.id = id;
  }
}
