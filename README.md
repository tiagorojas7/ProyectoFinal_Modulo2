# GymTracker — Documentación del proyecto

## ¿Qué hace?

Una web para registrar el progreso en el gimnasio: cargás un ejercicio con series, repeticiones y peso, y podés marcarlo como superado, editarlo o eliminarlo. Los pendientes se ven en una página, el historial de superados en otra.

## Estructura

```
index.html              → muestra el historial de progresos superados
secciones/progreso.html → muestra los progresos pendientes (con botones)
secciones/nuevaMarca.html → formulario para cargar un progreso nuevo
js/progreso.js           → la clase que representa UN registro
js/progresoManager.js    → maneja el array de registros y el localStorage
js/progresoUi.js         → dibuja todo en el DOM y escucha los clics
Css/styles.css           → estilos propios, arriba de Bootstrap
```

## Maquetación HTML

Las tres páginas usan Bootstrap 5 para la estructura general: `container` para centrar y limitar el ancho, `d-flex` / `flex-column` / `gap-3` para acomodar botones y secciones, y componentes ya armados como `btn`, `card` y `list-group` para no tener que escribir esas cajas a mano. El HTML propio queda simple: un `<header>` con el título de cada sección, un `<main>` con el contenido, y contenedores vacíos (`contenedor-progreso`, `contenedor-formulario`) que JavaScript llena en tiempo de ejecución.

## Estilos CSS

`styles.css` es chico a propósito: define una imagen de fondo fija para todo el body, agrega `text-shadow` y un fondo semitransparente a los textos para que se lean sobre la imagen, y pisa el color de los botones de Bootstrap (`.btn`) con una transición simple al pasar el mouse. No reemplaza a Bootstrap, lo completa.

## Conceptos de JavaScript usados

### `document.getElementById`
Busca un elemento del HTML por su `id` y te lo trae a JavaScript para poder manipularlo. Lo usamos en el constructor de `progresoUi` para agarrar los contenedores y botones de la página.

### `querySelector`
Como `getElementById`, pero busca por clase o cualquier selector CSS (`.list-group`). Se usa para encontrar el `<ul>` adentro de un contenedor.

### `addEventListener`
Le dice a un elemento "cuando pase esto (un click, un submit), ejecutá esta función". Cada botón (Agregar, Superar, Editar, Eliminar) tiene el suyo.

### `createElement` + `appendChild`
`createElement` crea un elemento HTML nuevo en memoria (todavía no se ve en la página). `appendChild` lo mete dentro de otro elemento para que aparezca en el DOM. Así armamos cada `<li>` y cada botón de la lista.

### `innerHTML`
Permite escribir HTML como si fuera texto, usando template literals (los strings con backticks `` ` ``). Se usa para armar rápido la parte fija de cada tarjeta (nombre, series, peso).

### Clases (`class`, `constructor`)
Una clase es un molde para crear objetos parecidos. `progreso` es el molde de un registro (tiene nombre, series, peso, etc). `progresoManager` y `progresoUi` también son clases, pero para organizar lógica, no solo datos.

### Módulos (`import` / `export`)
Cada archivo `.js` exporta su clase con `export class` y los demás la importan con `import { clase } from "./archivo.js"`. Sirve para separar responsabilidades: una clase por archivo, cada una con su trabajo.

### Arrays: `filter`, `find`, `forEach`, `push`
- `push` agrega un elemento al final del array.
- `filter` devuelve un array nuevo solo con los elementos que cumplen una condición (por ejemplo, `superada === true`).
- `find` devuelve el PRIMER elemento que cumple una condición (por ejemplo, buscar el registro con un `id` puntual).
- `forEach` recorre el array elemento por elemento para hacer algo con cada uno (dibujar un `<li>` por cada progreso).

### `localStorage` + `JSON.stringify` / `JSON.parse`
`localStorage` guarda datos en el navegador aunque cierres la página. Pero solo guarda texto, así que los objetos y arrays hay que convertirlos a texto con `JSON.stringify` antes de guardarlos, y volver a convertirlos a objetos con `JSON.parse` cuando los leemos.

### Operador ternario (`condicion ? siTrue : siFalse`)
Un `if/else` corto, pensado para usar adentro de un valor (como un string). Por ejemplo, elegir el título del formulario según si estás editando o agregando.

### Parámetros por defecto (`= null`)
Cuando una función puede recibir un dato opcional, se le pone un valor por defecto. Así `mostrarformulario(progresoAEditar = null)` funciona igual sin importar si le pasás algo o no.

### Clausura (closure)
Cuando una función "recuerda" una variable de donde fue creada, aunque esa variable ya no esté disponible en otro lado. Se usa para que cada botón de la lista sepa a qué registro pertenece, sin tener que leerlo del HTML.

## Cómo se conecta todo

1. `app.js` crea el `manager` (los datos) y la `ui` (el dibujo en pantalla), y llama a `render()`.
2. `render()` engancha los eventos y llama a `actualizarListaHtml()`.
3. `actualizarListaHtml()` le pide al `manager` la lista correcta (pendientes o superados) y se la pasa a `pintarLista()`.
4. `pintarLista()` recorre el array y crea un `<li>` por cada registro, con sus botones si corresponde.
5. Cada botón, al tocarlo, llama a un método del `manager` (agregar, editar, eliminar, marcar superado) y vuelve a llamar a `actualizarListaHtml()` para refrescar la pantalla.

> [!NOTE]
> Para algunas partes de este proyecto usé ayuda de IA en procesos que todavía no sabía resolver con mis conocimientos actuales (sobre todo la separación de vistas entre pendientes/superados y la conexión de los botones con la lógica ya existente). Me sirvió mucho para entender mejor la lógica detrás y para construir un proyecto más completo de lo que hubiera logrado solo en este punto del módulo.
