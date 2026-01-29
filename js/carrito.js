// Gestión del carrito de donaciones

// Obtener carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarContadorCarrito();
}

// Renderizar items del carrito
function renderizarCarrito() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    const cart = obtenerCarrito();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>No hay donaciones en tu carrito</h2>
                <p>Selecciona una causa para comenzar a ayudar</p>
                <a href="index.html" class="shop-btn">Ver causas</a>
            </div>
        `;
        actualizarTotales();
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <img src="${item.imagen}" alt="${item.nombre}" class="item-image" loading="lazy">
            <div class="item-details">
                <h3 class="item-title">${item.nombre}</h3>
                <div class="monto-editable">
                    <label for="monto-${index}">Monto:</label>
                    <div class="input-wrapper-inline">
                        <span class="currency-symbol">$</span>
                        <input 
                            type="number" 
                            id="monto-${index}" 
                            value="${item.precio}" 
                            min="100" 
                            step="100"
                            onchange="actualizarMonto(${index}, this.value)"
                            aria-label="Modificar monto de ${item.nombre}"
                        >
                    </div>
                </div>
                <button class="remove-btn" onclick="eliminarDelCarrito(${index})" aria-label="Eliminar ${item.nombre}">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');

    actualizarTotales();
}

// Actualizar monto de una donación
function actualizarMonto(index, nuevoMonto) {
    let cart = obtenerCarrito();
    const monto = parseFloat(nuevoMonto);

    if (!monto || monto < 100) {
        alert('El monto mínimo es de $100');
        renderizarCarrito();
        return;
    }

    if (cart[index]) {
        cart[index].precio = monto;
        guardarCarrito(cart);
        actualizarTotales();
        mostrarNotificacion('Monto actualizado');
    }
}

// Eliminar donación del carrito
function eliminarDelCarrito(index) {
    let cart = obtenerCarrito();
    cart.splice(index, 1);
    guardarCarrito(cart);
    renderizarCarrito();
    mostrarNotificacion('Donación eliminada del carrito');
}

// Actualizar totales
function actualizarTotales() {
    const cart = obtenerCarrito();
    const subtotal = cart.reduce((sum, item) => sum + item.precio, 0);

    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingElement = document.getElementById('shipping');

    if (subtotalElement) {
        subtotalElement.textContent = `$${formatearPrecio(subtotal)}`;
    }

    if (shippingElement) {
        shippingElement.textContent = 'No aplica';
    }

    if (totalElement) {
        totalElement.textContent = `$${formatearPrecio(subtotal)}`;
    }

    // Habilitar/deshabilitar botón de checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

// Formatear precio
function formatearPrecio(precio) {
    return precio.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// Mostrar formulario de checkout
function mostrarFormularioCheckout() {
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (checkoutForm && checkoutBtn) {
        checkoutForm.classList.remove('hidden');
        checkoutBtn.style.display = 'none';
        
        // Scroll al formulario
        checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #22c55e;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}

// Event listener para el botón de checkout
document.addEventListener('DOMContentLoaded', function() {
    renderizarCarrito();
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', mostrarFormularioCheckout);
    }
});