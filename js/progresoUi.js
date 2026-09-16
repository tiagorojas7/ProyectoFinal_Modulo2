export class progresoUi {
  constructor(manager) {
    this.manager = manager;

    this.btnAgregar = document.getElementById("btnAgregar");
    this.contenedorFormulario = document.getElementById(
      "contenedor-formulario",
    );

    this.vistaProgreso = document.getElementById("contenedor-progreso");
    this.vistaProgresoSuperada = document.getElementById(
      "contenedor-progreso-superado",
    );
  }

  render() {
    if (this.btnAgregar) {
      this.btnAgregar.addEventListener("click", () => {
        this.mostrarformulario();
      });
    }

    this.actualizarListaHtml();
  }

  mostrarformulario(progresoAEditar = null) {
    if (document.getElementById("form-seguimiento")) return;
    if (!this.contenedorFormulario) return;

    const esEdicion = progresoAEditar !== null;

    this.contenedorFormulario.innerHTML = `
      <form id="form-seguimiento" class="card p-4 shadow-sm w-100">
        <h3 class="fs-5 fw-bold mb-3 text-center">
          ${esEdicion ? "Editar Marca" : "Registrar Datos"}
        </h3>

        <div class="mb-3">
          <label class="form-label">Nombre del Ejercicio</label>
          <input type="text" id="input-ejercicio" class="form-control" required
            value="${esEdicion ? progresoAEditar.nombreEjercicio : ""}"
            ${esEdicion ? "disabled" : ""}>
        </div>
        <div class="mb-3">
          <label class="form-label">Número de Series</label>
          <input type="number" id="input-series" class="form-control" required
            value="${esEdicion ? progresoAEditar.series : ""}">
        </div>
        <div class="mb-3">
          <label class="form-label">Número de Repeticiones</label>
          <input type="number" id="input-reps" class="form-control" required
            value="${esEdicion ? progresoAEditar.repeticiones : ""}">
        </div>
        <div class="mb-3">
          <label class="form-label">Peso Utilizado (kg)</label>
          <input type="number" id="input-peso" class="form-control" required
            value="${esEdicion ? progresoAEditar.peso : ""}">
        </div>

        <button type="submit" class="btn btn-success w-100">
          ${esEdicion ? "Guardar Cambios" : "Guardar Marca"}
        </button>
      </form>
    `;

    const formulario = document.getElementById("form-seguimiento");
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      const series = parseInt(document.getElementById("input-series").value);
      const repeticiones = parseInt(
        document.getElementById("input-reps").value,
      );
      const peso = parseInt(document.getElementById("input-peso").value);

      if (esEdicion) {
        this.manager.editarProgreso(
          progresoAEditar.id,
          peso,
          series,
          repeticiones,
        );
      } else {
        const ejercicio = document.getElementById("input-ejercicio").value;
        this.manager.agregarProgreso(ejercicio, series, repeticiones, peso);
      }

      this.contenedorFormulario.innerHTML = "";
      this.actualizarListaHtml();
    });
  }

  actualizarListaHtml() {
    if (this.vistaProgreso) {
      const listaUl = this.vistaProgreso.querySelector(".list-group");
      this.pintarLista(
        listaUl,
        this.manager.obtenerProgresosPendientes(),
        true,
      );
    }

    if (this.vistaProgresoSuperada) {
      const listaUl = this.vistaProgresoSuperada.querySelector(".list-group");
      this.pintarLista(
        listaUl,
        this.manager.obtenerProgresosSuperados(),
        false,
      );
    }
  }

  // dibuja un <ul> a partir de una lista de progresos.
  // conBotones decide si se agregan los 3 botones de accion (solo en pendientes).
  pintarLista(listaUl, lista, conBotones) {
    if (!listaUl) return;

    listaUl.innerHTML = "";

    if (lista.length === 0) {
      listaUl.innerHTML = `<li class="list-group-item">No hay registros aun..</li>`;
      return;
    }

    lista.forEach((p) => {
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

      if (conBotones) {
        const contenedorBotones = document.createElement("div");
        contenedorBotones.className = "mt-2 d-flex gap-2";

        const btnSuperar = document.createElement("button");
        btnSuperar.className = "btn btn-sm btn-success";
        btnSuperar.textContent = "Marcar superado";
        btnSuperar.addEventListener("click", () => {
          this.manager.marcarProgresoSuperado(p.id);
          this.actualizarListaHtml();
        });

        const btnEditar = document.createElement("button");
        btnEditar.className = "btn btn-sm btn-secondary";
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
          this.mostrarformulario(p);
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-sm btn-danger";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
          this.manager.eliminarProgreso(p.id);
          this.actualizarListaHtml();
        });

        contenedorBotones.appendChild(btnSuperar);
        contenedorBotones.appendChild(btnEditar);
        contenedorBotones.appendChild(btnEliminar);

        itemLista.querySelector("div").appendChild(contenedorBotones);
      }

      listaUl.appendChild(itemLista);
    });
  }
}
