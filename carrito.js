
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}


class Carrito {
  constructor() {
    this.productos = []; 
  }


  agregarProducto(producto) {
    this.productos.push(producto);
    console.log(`${producto.nombre} ha sido agregado al carrito.`);
  }


  calcularTotal() {
    return this.productos.reduce((total, producto) => total + producto.precio, 0);
  }


  finalizarCompra() {
    if (this.productos.length === 0) {
      console.log("El carrito está vacío. No se puede finalizar la compra.");
    } else {
      const total = this.calcularTotal();
      console.log(`Compra finalizada. Total a pagar: $${total.toFixed(2)}`);
    }
  }


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


function validarProducto(nombreProducto, tienda) {
  return tienda.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());
}


const productosDisponibles = [
  new Producto('Manzana', 1.5),
  new Producto('Leche', 2.3),
  new Producto('Pan', 1.1),
  new Producto('Jugo', 3.0),
  new Producto('Arroz', 2.0)
];


function aplicarDescuento(total, porcentaje) {
  return total - (total * porcentaje / 100);
}


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function preguntar(pregunta) {
  return new Promise(resolve => rl.question(pregunta, respuesta => resolve(respuesta)));
}


async function iniciarCompra() {
  const carrito = new Carrito();
  let continuar = true;

  while (continuar) {
    let nombreProducto = await preguntar("Ingrese el nombre del producto que desea agregar al carrito: ");


    let producto = validarProducto(nombreProducto, productosDisponibles);
    while (!producto) {
      nombreProducto = await preguntar("Producto no válido. Ingrese el nombre correcto del producto: ");
      producto = validarProducto(nombreProducto, productosDisponibles);
    }


    carrito.agregarProducto(producto);


    const respuesta = await preguntar("¿Desea agregar otro producto al carrito? (si/no): ");
    continuar = respuesta.toLowerCase() === 'si';
  }


  carrito.mostrarDetalles();


  const total = carrito.calcularTotal();
  if (total > 50) {
    const totalConDescuento = aplicarDescuento(total, 10); 
    console.log(`Se aplicó un descuento del 10%. Total con descuento: $${totalConDescuento.toFixed(2)}`);
  }


  carrito.finalizarCompra();


  rl.close();
}


iniciarCompra();
