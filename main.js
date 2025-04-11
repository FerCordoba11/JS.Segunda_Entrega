const gestorCarrito = new GestorCarrito();

//-----------------------------------------------------------------------------------
async function cargarProductosDesdeJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar productos: ${response.status}`);
        }
        const productos = await response.json();
        gestorCarrito.stockProductos = productos;
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al cargar productos:", error);
        const contenedorProductos = document.getElementById('productos');
        contenedorProductos.innerHTML = '<p>Hubo un error al cargar los productos.</p>';
    }
}


//-----------------------------------------------------------------------------------
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.classList.add('decoImg');
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('DecoProducto');
        productoElemento.setAttribute('data-aos', 'fade-up');
        productoElemento.setAttribute('data-aos-duration', '2000');
        productoElemento.id = producto.id;

        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="deco1">
            <div class="Name">${producto.nombre}</div>
            <div class="Tipo">$${producto.precio}</div>
            <button class="text-focus-in comprar-btn" data-id="${producto.id}">Comprar</button>
        `;
        contenedorProductos.appendChild(productoElemento);
    });

    document.querySelectorAll('.comprar-btn').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = parseInt(e.target.dataset.id, 10);
            gestorCarrito.agregarProducto(idProducto);
        });
    });
}



//-----------------------------------------------------------------------------------
const cartLogo = document.querySelector('.cart');
cartLogo.addEventListener('click', () => {
    const menu = document.querySelector('#menu');
    if (menu) {
        menu.classList.toggle('show');
    } else {
        console.error("El menú no está definido.");
    }
});


gestorCarrito.actualizarMenu();
cargarProductosDesdeJSON('productos.json');


//-----------------------------------------------------------------------------------
function crearBarraAside() {
    const aside = document.createElement('aside');
    aside.classList.add('barra-aside');
    aside.innerHTML = `
        <div class="busqueda">
            <input type="text" id="busqueda" placeholder="Buscar productos">
        </div>
        <div class="ordenar">
            <h3>Ordenar</h3>
            <label>Ordenar por precio:</label>
            <select id="ordenar-precio">
                <option value="">Seleccionar</option>
                <option value="asc">Menor a Mayor</option>
                <option value="desc">Mayor a Menor</option>
            </select>
            <label>Ordenar por nombre:</label>
            <select id="ordenar-nombre">
                <option value="">Seleccionar</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
            </select>
        </div>
    `;

    const contenedor = document.querySelector('#contenedor');
    contenedor?.insertAdjacentElement('beforebegin', aside);

    ['input', 'change'].forEach(evento => {
        aside.addEventListener(evento, manejarEventosAside);
    });
}


//-----------------------------------------------------------------------------------
function manejarEventosAside() {
    const textoBusqueda = document.getElementById('busqueda')?.value.toLowerCase() || '';
    const ordenPrecio = document.getElementById('ordenar-precio')?.value;
    const ordenNombre = document.getElementById('ordenar-nombre')?.value;

    const productosFiltrados = gestorCarrito.stockProductos
        .filter(p => p.nombre.toLowerCase().includes(textoBusqueda))
        .sort((a, b) => {
            if (ordenPrecio === 'asc') return a.precio - b.precio;
            if (ordenPrecio === 'desc') return b.precio - a.precio;
            if (ordenNombre === 'az') return a.nombre.localeCompare(b.nombre);
            if (ordenNombre === 'za') return b.nombre.localeCompare(a.nombre);
            return 0;
        });

    mostrarProductos(productosFiltrados);
}

// Inicializar barra lateral
crearBarraAside();