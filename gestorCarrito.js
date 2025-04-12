class GestorCarrito {
    constructor() {
        this.carrito = [];
        this.stockProductos = [];
        this.cargarDesdeLocalStorage();
    }

    guardarEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
        localStorage.setItem("stockProductos", JSON.stringify(this.stockProductos));
    }

    cargarDesdeLocalStorage() {
        try {
            const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
            const stockGuardado = JSON.parse(localStorage.getItem("stockProductos"));
            this.carrito = Array.isArray(carritoGuardado) ? carritoGuardado : [];
            this.stockProductos = Array.isArray(stockGuardado) ? stockGuardado : [];
        } catch (error) {
            console.error("Error al cargar datos de localStorage:", error);
            this.carrito = [];
            this.stockProductos = [];
        }
    }


//-----------------------------------------------------------------------------------
    agregarProducto(idProducto) {
        const producto = this.stockProductos.find(item => item.id === idProducto);

        if (producto && producto.cantidad > 0) {
            const productoEnCarrito = this.carrito.find(item => item.id === idProducto);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                this.carrito.push({

                    cantidad: 1
                });
            }
            producto.cantidad--;
            this.actualizarMenu();
            this.mostrarNotificacion("¡Producto agregado al carrito!");
            this.guardarEnLocalStorage();
        } else {
            this.mostrarNotificacion("No hay stock disponible.");
        }
    }

//-----------------------------------------------------------------------------------
    eliminarProducto(idProducto) {
        const productoEnCarrito = this.carrito.find(item => item.id === idProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad--;
            if (productoEnCarrito.cantidad === 0) {
                this.carrito = this.carrito.filter(item => item.id !== idProducto);
            }
            const productoEnStock = this.stockProductos.find(item => item.id === idProducto);
            if (productoEnStock) {
                productoEnStock.cantidad++;
            }
            this.actualizarMenu();
            this.mostrarNotificacion("Producto eliminado del carrito.");
            this.guardarEnLocalStorage();
        } else {
            this.mostrarNotificacion("El producto no está en el carrito.");
        }
    }

//-----------------------------------------------------------------------------------
    mostrarNotificacion(mensaje, tipo = "success") {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: tipo,
            title: mensaje
        });
    }

//-----------------------------------------------------------------------------------
    actualizarMenu() {
        const menu = document.querySelector('#menu');
        if (!menu) {
            console.error("El elemento con ID 'menu' no existe.");
            return;
        }
        menu.innerHTML = '';
        menu.style.top = '80px';
        menu.style.maxHeight = '500px'; // Altura máxima para el scroll
        menu.style.overflowY = 'auto'; // Activar barra de desplazamiento
    
        if (this.carrito.length > 0) {
            this.carrito.forEach(producto => menu.appendChild(this.crearElementoCarrito(producto)));
            const totalCarrito = this.calcularTotal();
            menu.innerHTML += `<p>Total: $${totalCarrito}</p>`;
        } else {
            menu.innerHTML = '<p>El carrito está vacío</p>';
        }


//-----------------------------------------------------------------------------------
        // Agregar el botón para redirigir al archivo carrito.html
        const botonCarritoHTML = document.createElement('button');
        botonCarritoHTML.textContent = 'Finalizar compra';
        botonCarritoHTML.classList.add('boton-ir-carrito');
        botonCarritoHTML.addEventListener('click', () => {
            window.location.href = './carrito.html'; // Redirige al archivo HTML
        });
        menu.appendChild(botonCarritoHTML);
    
        // Asignar eventos a los botones de cantidad
        this.asignarEventosCantidad();
    }


//-----------------------------------------------------------------------------------
    crearElementoCarrito(producto) {
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('item-carrito');
        const nombreTruncado = producto.nombre.split(' ').slice(0, 2).join(' ');
        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="miniatura">
            <p>${nombreTruncado}</p>
            <p>$${producto.precio * producto.cantidad}</p>
            <div class="cantidad-controles">
                <button class="botonCarrito restar-cantidad" data-id="${producto.id}">-</button>
                <span>${producto.cantidad}</span>
                <button class="botonCarrito sumar-cantidad" data-id="${producto.id}">+</button>
            </div>
        `;
        return productoElemento;
    }



//----------------------------------------------------------------------------------
    asignarEventosCantidad() {
        document.querySelectorAll('.sumar-cantidad').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const idProducto = parseInt(e.target.dataset.id, 10);
                this.agregarProducto(idProducto);
            });
        });

        document.querySelectorAll('.restar-cantidad').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const idProducto = parseInt(e.target.dataset.id, 10);
                this.eliminarProducto(idProducto);
            });
        });
    }

    calcularTotal() {
        return this.carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    }
}



