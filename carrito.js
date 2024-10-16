// Clase Producto con los atributos 'nombre' y 'precio'
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Clase Carrito que tiene un arreglo para almacenar los productos seleccionados
class Carrito {
  constructor() {
    this.productos = []; // Arreglo para almacenar los productos
  }

  // Función para agregar productos al carrito
  agregarProducto(producto) {
    this.productos.push(producto);
    console.log(`${producto.nombre} ha sido agregado al carrito.`);
  }

  // Función para calcular el total de la compra
  calcularTotal() {
    return this.productos.reduce((total, producto) => total + producto.precio, 0);
  }

  // Función para finalizar la compra y mostrar el total
  finalizarCompra() {
    if (this.productos.length === 0) {
      console.log("El carrito está vacío. No se puede finalizar la compra.");
    } else {
      const total = this.calcularTotal();
      console.log(`Compra finalizada. Total a pagar: $${total.toFixed(2)}`);
    }
  }

  // Función para mostrar los detalles de la compra
  mostrarDetalles() {
    console.log("Detalles de la compra:");
    if (this.productos.length === 0) {
      console.log("El carrito está vacío.");
    } else {
      this.productos.forEach((producto, index) => {
        console.log(`${index + 1}. Producto: ${producto.nombre}, Precio: $${producto.precio.toFixed(2)}`);
      });
      console.log(`Total: $${this.calcularTotal().toFixed(2)}`);
    }
  }
}

// Función que valida si el producto ingresado existe en la lista de productos disponibles
function validarProducto(nombreProducto, tienda) {
  return tienda.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());
}

// Lista de productos disponibles en el supermercado
const productosDisponibles = [
  new Producto('Manzana', 1.5),
  new Producto('Leche', 2.3),
  new Producto('Pan', 1.1),
  new Producto('Jugo', 3.0),
  new Producto('Arroz', 2.0)
];

// Función para aplicar un descuento
function aplicarDescuento(total, porcentaje) {
  return total - (total * porcentaje / 100);
}

// Importar el módulo readline para leer la entrada del usuario
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para pedir datos al usuario de forma asíncrona
function preguntar(pregunta) {
  return new Promise(resolve => rl.question(pregunta, respuesta => resolve(respuesta)));
}

// Función para simular la compra
async function iniciarCompra() {
  const carrito = new Carrito();
  let continuar = true;

  while (continuar) {
    let nombreProducto = await preguntar("Ingrese el nombre del producto que desea agregar al carrito: ");

    // Validar que el producto exista
    let producto = validarProducto(nombreProducto, productosDisponibles);
    while (!producto) {
      nombreProducto = await preguntar("Producto no válido. Ingrese el nombre correcto del producto: ");
      producto = validarProducto(nombreProducto, productosDisponibles);
    }

    // Agregar producto válido al carrito
    carrito.agregarProducto(producto);

    // Preguntar si desea agregar más productos
    const respuesta = await preguntar("¿Desea agregar otro producto al carrito? (si/no): ");
    continuar = respuesta.toLowerCase() === 'si';
  }

  // Mostrar detalles y calcular total
  carrito.mostrarDetalles();

  // Aplicar descuento si el total es mayor a $50
  const total = carrito.calcularTotal();
  if (total > 50) {
    const totalConDescuento = aplicarDescuento(total, 10); // 10% de descuento
    console.log(`Se aplicó un descuento del 10%. Total con descuento: $${totalConDescuento.toFixed(2)}`);
  }

  // Finalizar compra
  carrito.finalizarCompra();

  // Cerrar la interfaz readline
  rl.close();
}

// Iniciar la compra
iniciarCompra();
