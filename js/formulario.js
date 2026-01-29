// Gestión del formulario de donación y WhatsApp

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('shippingForm');
    
    if (form) {
        form.addEventListener('submit', enviarDonacionWhatsApp);
    }
});

function enviarDonacionWhatsApp(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const datos = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        direccion: formData.get('direccion') || 'No proporcionada',
        ciudad: formData.get('ciudad') || 'No proporcionada',
        provincia: formData.get('provincia') || 'No proporcionada',
        codigoPostal: formData.get('codigoPostal') || 'No proporcionado',
        notas: formData.get('notas') || 'Sin notas adicionales'
    };
    
    // Obtener donaciones del carrito
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('No hay donaciones en tu carrito');
        return;
    }
    
    // Calcular total
    const total = cart.reduce((sum, item) => sum + item.precio, 0);
    
    // Guardar el total en localStorage para mostrarlo en la página de gracias
    localStorage.setItem('orderTotal', total.toString());
    
    // Construir mensaje para WhatsApp
    let mensaje = `*NUEVA DONACIÓN*\n\n`;
    mensaje += `*Datos del Donante:*\n`;
    mensaje += `Nombre: ${datos.nombre}\n`;
    mensaje += `Teléfono: ${datos.telefono}\n`;
    mensaje += `Email: ${datos.email}\n\n`;
    
    if (datos.direccion !== 'No proporcionada') {
        mensaje += `*Dirección (opcional):*\n`;
        mensaje += `Calle: ${datos.direccion}\n`;
        mensaje += `Ciudad: ${datos.ciudad}\n`;
        mensaje += `Provincia: ${datos.provincia}\n`;
        mensaje += `Código Postal: ${datos.codigoPostal}\n\n`;
    }
    
    mensaje += `*Causas Seleccionadas:*\n`;
    cart.forEach((item, index) => {
        mensaje += `${index + 1}. ${item.nombre}\n`;
        mensaje += `   Monto: $${formatearPrecio(item.precio)}\n\n`;
    });
    
    mensaje += `*TOTAL A DONAR: $${formatearPrecio(total)}*\n\n`;
    
    if (datos.notas !== 'Sin notas adicionales') {
        mensaje += `*Mensaje del donante:*\n${datos.notas}\n\n`;
    }
    
    mensaje += `_Gracias por tu generosidad y apoyo_ ❤️`;
    
    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Número de WhatsApp (sin espacios ni símbolos)
    const numeroWhatsApp = '5493543586985';
    
    // Crear URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp en nueva ventana
    window.open(urlWhatsApp, '_blank');
    
    // Limpiar carrito y redirigir a página de gracias
    localStorage.removeItem('cart');
    
    // Redirigir a la página de agradecimiento
    window.location.href = 'gracias.html';
}

function formatearPrecio(precio) {
    return precio.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}