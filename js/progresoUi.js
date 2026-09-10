export class progresoUi {
  constructor(manager) {
    this.manager = manager;

    this.btnAgregar = document.getElementById("btnAgregar");
    this.contenedorFormulario = document.getElementById(
      "contenedor-formulario",
    );

    this.vistaProgreso = document.getElementById("contenedor-progreso");
  }

  render() {
    if (this.btnAgregar) {
      this.btnAgregar.addEventListener("click", () => {
        this.mostrarformulario();
      });
    }
    this.actualizarListaHtml();
  }

  mostrarformulario() {
    if (document.getElementById("form-seguimiento")) return;
    this.contenedorFormulario.innerHTML = ` 
      <form id="form-seguimiento" class="card p-4 shadow-sm w-100">
        <h3 class="fs-5 fw-bold mb-3 text-center">Registrar Datos</h3>
        
        <div class="mb-3">
          <label class="form-label">Nombre del Ejercicio</label>
          <input type="text" id="input-ejercicio" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Número de Series</label>
          <input type="number" id="input-series" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Número de Repeticiones</label>
          <input type="number" id="input-reps" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Peso Utilizado (kg)</label>
          <input type="number" id="input-peso" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-success w-100">Guardar Marca</button>
      </form>
    `;

    const formulario = document.getElementById("form-seguimiento");
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      const ejercicio = document.getElementById("input-ejercicio").value;
      const series = parseInt(document.getElementById("input-series").value);
      const repeticiones = parseInt(
        document.getElementById("input-reps").value,
      );
      const peso = parseFloat(document.getElementById("input-peso").value);

      this.manager.agregarProgreso(ejercicio, series, repeticiones, peso);

      this.contenedorFormulario.innerHTML = "";

      this.actualizarListaHtml();
    });
  }

  actualizarListaHtml() {
    if (!this.vistaProgreso) return;

    const listaUl = this.vistaProgreso.querySelector(".list-group");
    if (!listaUl) return;

    listaUl.innerHTML = "";

    const listaActual = this.manager.obtenerProgresos();

    if (listaActual.length === 0) {
      listaUl.innerHTML = `<li class="list-group-item">No hay registros aun..</li>`;
      return;
    }

    listaActual.forEach((p) => {
      const itemLista = document.createElement("li");
      itemLista.className =
        "list-group-item d-flex justify-content-between align-items-center mb-2 border-1";
      itemLista.innerHTML = `
        <div>
          <h5 class="text-primary fw-bold mb-1">${p.nombreEjercicio}</h5>
          <small class="text-muted">Series: <strong>${p.series}</strong> | Reps: <strong>${p.repeticiones}</strong></small>
        </div>
        <span class="fs-7">${p.peso} kg</span>
      `;

      listaUl.appendChild(itemLista);
    });
  }
}
