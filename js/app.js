import { progresoManager } from "./progresoManager.js";
import { progresoUi } from "./progresoUi.js";
const manager = new progresoManager();
const ProgresoUi = new progresoUi(manager);

ProgresoUi.render();
