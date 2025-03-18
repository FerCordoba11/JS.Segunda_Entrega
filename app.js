/**
 * Objetivos:
 * x Usar variables
 * x Usar array
 * x Usar funciones
 * x Usar algún ciclo
 *  */
// Funcion que se pueda volver a usar - Si en stock hay tal item se sumana ++ a cantidad carrito y se restara al stock
// function calcularTotal










const stockProductos = [
    { id: 1, nombre: "Xiaomi Redmi Watch 5 Active", precio: 500, cantidad: 10 },
    { id: 2, nombre: "Black Shark S1 Pro 1.43 Smartwatch", precio: 1000, cantidad: 5 },
    { id: 3, nombre: "Black Shark S1 Classic 1,43 Amoled", precio: 1500, cantidad: 8 },
    { id: 4, nombre: "Black Shark S1 Classic", precio: 500, cantidad: 10 },
    { id: 5, nombre: "Xiaomi Mi Band 8 Pro", precio: 1000, cantidad: 5 },
    { id: 6, nombre: "Xiaomi Redmi Watch 4", precio: 1500, cantidad: 8 },
    { id: 7, nombre: "Amazfit GTR 3 Pro", precio: 500, cantidad: 10 },
    { id: 8, nombre: "Forerunner 55 Running Garmin", precio: 1000, cantidad: 5 },
    { id: 9, nombre: "Forerunner 165 Garmin", precio: 1500, cantidad: 8 },
    { id: 10, nombre: "Amazfit Balance", precio: 500, cantidad: 10 },
    { id: 11, nombre: "Xiaomi Watch S3", precio: 1000, cantidad: 5 },
    { id: 12, nombre: "Amazfit New GTR 4 NEW", precio: 1500, cantidad: 8 },
    { id: 13, nombre: "Smartwatch Dm56", precio: 500, cantidad: 10 },
    { id: 14, nombre: "Smartwatch Hk08", precio: 1000, cantidad: 5 },
    { id: 15, nombre: "Smartwatch Reloj Táctico K67", precio: 1500, cantidad: 8 }];

const carrito = [];






// Funcion de agregar al carrito -----------------------------------------
function agregarAlCarrito(idProducto) {
    const producto = stockProductos.find(item => item.id === idProducto);
    if (producto && producto.cantidad > 0) { 
        const productoEnCarrito = carrito.find(item => item.id === idProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ id: producto.id, nombre: producto.nombre, cantidad: 1, precio: producto.precio });
        }
        producto.cantidad--;
        console.log("Carrito actualizado:");
        carrito.forEach(item => {
            console.log(`${item.nombre} - ${item.cantidad} unidades`);
        });
    } else {
        console.error("No hay stock del producto o el producto no existe.");
    }
}



// Funcion de eliminar el último producto agregado al carrito ------------
// agregar la posibilidad de eliminar un producto puntual del carrito

function eliminarDelCarrito() {
    if (carrito.length > 0) {
        carrito.pop();
    } else {
        console.error("El carrito está vacío.");
    }
};


// Mostrar total del carrito --------------------------------------------

function mostrarCarrito() {
    console.log(carrito);
    calcularTotalCarrito();
}



function calcularTotalCarrito() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad; 
    });
    console.log(`Total del carrito: $${total}`);
}



function mostrarStock() {
    stockProductos.forEach((producto, index) => console.log(`producto ${index}: ${producto.nombre} - $${producto.precio} - Stock: ${producto.cantidad}`));
};








const name = document.querySelector('#name');
name.innertext = "Hola";




console.log("barraNav");


