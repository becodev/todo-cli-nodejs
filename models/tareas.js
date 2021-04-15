const Tarea = require("./tarea");
require("colors");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(description) {
    const tarea = new Tarea(description);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, x) => {
      let indice = `${x + 1}`.green;
      const { completed, description } = tarea;
      const estado = completed ? "Completada".green : "Pendiente".red;
      const item = `${indice}. ${description} :: ${estado}`;
      console.log(item);
    });
  }

  listarPendientesCompletadas(completadas) {
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { completed, description } = tarea;
      const estado = completed ? "Completada".green : "Pendiente".red;

      if (completadas == false && completed == null) {
        contador += 1;
        console.log(
          `${contador.toString().green}. ${description} :: ${estado}`
        );
      }

      if (completadas && completed != null) {
        contador += 1;
        console.log(
          `${contador.toString().green}. ${description} :: ${estado}`
        );
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completed) {
        tarea.completed = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        const tare = this._listado[tarea.id];
        tare.completed = null;
      }
    });
  }
}

module.exports = Tareas;
