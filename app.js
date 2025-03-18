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
    { id: 15, nombre: "Smartwatch Reloj Táctico K67", precio: 1500, cantidad: 8 }
];

const carrito = [];

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div");
    notificacion.className = "notificacion";
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    notificacion.style.display = "block";
    setTimeout(() => { notificacion.style.display = "none"; }, 3000); }





// Función para agregar productos al carrito
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
        actualizarMenu(); // Actualizar el menú tras modificar el carrito
        mostrarNotificacion("¡Producto agregado al carrito!");
    } else {
        mostrarNotificacion("No hay stock disponible.");
    }
};

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    const productoEnCarrito = carrito.find(item => item.id === idProducto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad === 0) {
            carrito.splice(carrito.indexOf(productoEnCarrito), 1);
        }
        const productoEnStock = stockProductos.find(item => item.id === idProducto);
        productoEnStock.cantidad++; // Devolver el stock
        actualizarMenu();
        mostrarNotificacion("Producto eliminado del carrito.");
    } else {
        mostrarNotificacion("El producto no está en el carrito.");
    }
};

// Función para actualizar el menú
function actualizarMenu() {
    const menu = document.querySelector('#menu');
    if (!menu) {
        console.error("El elemento con ID 'menu' no existe.");
        return;
    }
    menu.innerHTML = '';
    if (carrito.length > 0) {
        carrito.forEach(producto => {
            menu.innerHTML += `
                <div class="item-carrito">
                    <p>${producto.cantidad} x ${producto.nombre} - $${producto.precio * producto.cantidad}</p>
                </div>
            `;
        });
        menu.innerHTML += `<p>Total: $${calcularTotalCarrito()}</p>
        <button class="text-focus-in"><a href="../JS.Segunda_Entrega/pages/carrito.html">Carrito</a></button>`;
    } else {
        menu.innerHTML = '<p>El carrito está vacío</p>';
    }
};

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
;}

// Función para mostrar el stock en consola
function mostrarStock() {
    stockProductos.forEach(producto => console.log(`${producto.nombre}: Stock - ${producto.cantidad}`));
}

// Manejo del icono del carrito
const cartLogo = document.querySelector('.cart');
const menu = document.querySelector('#menu');
cartLogo.addEventListener('click', () => {
    if (menu) {
        menu.classList.toggle('show');
    } else {
        console.error("El menú no está definido.");
    }
});


















// Evento de clic para agregar un producto al carrito
// document.querySelector('#agregar').addEventListener('click', () => {
//     const idProducto = parseInt(document.querySelector('#idProducto').value);
//     agregarAlCarrito(idProducto);
// });


