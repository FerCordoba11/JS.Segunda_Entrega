document.getElementById('generatePDFButton').addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Recuperar datos del carrito desde localStorage
    let carrito = [];
    try {
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (error) {
        console.error("Error al recuperar el carrito de localStorage:", error);
    }

    const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);

    // Título del PDF
    doc.setFontSize(18);
    doc.text('Resumen de la Compra', 10, 10);

    let yPosition = 20; // Posición inicial en la página

    // Función para manejar saltos de página
    const checkPageEnd = () => {
        if (yPosition > 270) { // Límites verticales de la página
            doc.addPage();
            yPosition = 10; // Reiniciar posición en la nueva página
        }
    };

    // Datos personales
    doc.setFontSize(14);
    doc.text('Datos Personales:', 10, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(`Nombre: ${document.getElementById('firstName').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Apellido: ${document.getElementById('lastName').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`DNI: ${document.getElementById('dni').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Dirección: ${document.getElementById('address').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Teléfono: ${document.getElementById('phone').value}`, 10, yPosition);
    yPosition += 20;
    checkPageEnd();

    // Datos de envío
    doc.setFontSize(14);
    doc.text('Datos de Envío:', 10, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(`Calle: ${document.getElementById('street').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Número: ${document.getElementById('number').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Localidad: ${document.getElementById('locality').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Provincia: ${document.getElementById('province').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`País: ${document.getElementById('country').value}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Código Postal: ${document.getElementById('postalCode').value}`, 10, yPosition);
    yPosition += 20;
    checkPageEnd();

    // Forma de pago
    doc.setFontSize(14);
    doc.text('Formas de Pago:', 10, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(`Método de Pago: ${document.getElementById('paymentMethod').value}`, 10, yPosition);
    yPosition += 20;
    checkPageEnd();

    // Productos del carrito
    doc.setFontSize(14);
    doc.text('Productos:', 10, yPosition);
    yPosition += 10;

    for (const producto of carrito) {
        // Convertir imagen a Base64
        let base64Img = '';
        try {
            base64Img = await fetchBase64(producto.imagen);
        } catch (error) {
            console.error("Error al convertir la imagen a Base64:", error);
        }

        // Agregar imagen al PDF (si está disponible)
        if (base64Img) {
            doc.addImage(base64Img, 'JPEG', 10, yPosition, 30, 30); // Ajusta las dimensiones según sea necesario
        }

        // Agregar texto del producto
        doc.setFontSize(12);
        doc.text(`${producto.nombre} | $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}`, 50, yPosition + 10);

        yPosition += 40; // Aumenta el espaciado para el siguiente producto
        checkPageEnd(); // Verificar si se necesita un salto de página
    }

    // Total del carrito
    doc.setFontSize(14);
    yPosition += 10;
    checkPageEnd(); // Verificar si se necesita un salto antes del total
    doc.text(`Total de la compra: $${total}`, 10, yPosition);

    // Guardar PDF
    doc.save('resumen-compra.pdf');
});

// Función para convertir imagen a Base64
async function fetchBase64(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error al obtener la imagen:", error);
        return ''; // Devuelve una cadena vacía si falla
    }
}