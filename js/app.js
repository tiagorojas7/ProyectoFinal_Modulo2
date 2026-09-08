import { progresoManager } from "./progresoManager.js";
const manager = new progresoManager();

//Verificacion de los metodos
manager.agregarProgreso("press banca", 3, 12, 90);
manager.agregarProgreso("bicep martillo", 4, 12, 9);
manager.agregarProgreso("press inclinado", 4, 12, 60);
manager.agregarProgreso("vuelos laterales", 3, 12, 12);
console.log(manager.obtenerProgresos());

manager.editarProgreso(1, 100, 3, 10);
console.log(manager.progresos);

manager.marcarProgresoSuperado(1);
manager.marcarProgresoSuperado(3);
console.log(manager.obtenerProgresosSuperados());

manager.eliminarProgreso(1);
console.log(manager.progresos);
