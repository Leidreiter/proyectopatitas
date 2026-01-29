// Base de datos de causas/proyectos para donaciones
const productos = [
    {
        id: 1,
        nombre: "Donación para gastos en Traslados",
        descripcion: "Ayudás a llevar a cada animal al lugar donde puede recibir ayuda.",
        descripcionDetallada: "Muchos rescates comienzan con un traslado urgente: desde la calle hasta un hogar de tránsito, una veterinaria o un lugar seguro. Esta donación permite cubrir gastos de combustible, transporte y logística necesarios para actuar rápido ante emergencias. Cada traslado es el primer paso para una nueva oportunidad de vida.",
        precioSugerido: 5000,
        imagen: "img/donaciones/traslados.png",
        galeria: [
            "img/donaciones/traslados.png",
            "img/donaciones/001.png",
            "img/donaciones/002.png",
            "img/donaciones/003.png",
            "img/donaciones/004.png"
        ],
        categoria: "donación",
        stock: 999,
        caracteristicas: [
            "Traslados a veterinarias",
            "Rescates de emergencia",
            "Movilidad para hogares de tránsito",
            "Respuesta rápida ante denuncias"
        ]
    },
    {
        id: 2,
        nombre: "Donación para Veterinaria y cuidados médicos",
        descripcion: "Cubrí consultas, tratamientos y cuidados médicos urgentes.",
        descripcionDetallada: "La atención veterinaria es clave para la recuperación de animales rescatados. Con esta donación se cubren consultas, estudios, medicación, cirugías y tratamientos necesarios para que cada animal pueda sanar y continuar su camino hacia la adopción responsable.",
        precioSugerido: 7000,
        imagen: "img/donaciones/veterinaria.png",
        galeria: [
            "img/donaciones/veterinaria.png",
            "img/donaciones/001.png",
            "img/donaciones/002.png",
            "img/donaciones/003.png",
            "img/donaciones/004.png"
        ],
        categoria: "donación",
        stock: 999,
        caracteristicas: [
            "Consultas veterinarias",
            "Medicaciones y tratamientos",
            "Cirugías y estudios médicos",
            "Castraciones y controles"
        ]
    },
    {
        id: 3,
        nombre: "Donación para Alimento y nutrición",
        descripcion: "Garantizá que ningún rescatado pase hambre.",
        descripcionDetallada: "Una alimentación adecuada es fundamental para la recuperación física y emocional. Esta donación permite comprar alimento balanceado y suplementos para animales en tránsito, en recuperación o alojados temporalmente. Comer bien también es parte de sanar.",
        precioSugerido: 4000,
        imagen: "img/donaciones/alimentos.png",
        galeria: [
            "img/donaciones/alimentos.png",
            "img/donaciones/001.png",
            "img/donaciones/002.png",
            "img/donaciones/003.png",
            "img/donaciones/004.png"
        ],
        categoria: "donación",
        stock: 999,
        caracteristicas: [
            "Alimento balanceado",
            "Suplementos nutricionales",
            "Dietas especiales",
            "Apoyo a hogares de tránsito"
        ]
    },
    {
        id: 4,
        nombre: "Donación para Locación y otros gastos",
        descripcion: "Ayudás a sostener los espacios donde los animales se recuperan.",
        descripcionDetallada: "Los animales rescatados necesitan un lugar seguro donde recuperarse. Esta donación contribuye a cubrir gastos de alquiler, mantenimiento, servicios y acondicionamiento de los espacios que funcionan como refugio o punto de tránsito.",
        precioSugerido: 6000,
        imagen: "img/donaciones/locación.png",
        galeria: [
            "img/donaciones/locación.png",
            "img/donaciones/001.png",
            "img/donaciones/002.png",
            "img/donaciones/003.png",
            "img/donaciones/004.png"
        ],
        categoria: "donación",
        stock: 999,
        caracteristicas: [
            "Servicios básicos",
            "Limpieza y acondicionamiento",
            "Comunicación y difusión",
            "Gastos operativos generales"
        ]
    }
];

// Renderizar causas/proyectos
function renderizarProductos() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = productos.map(producto => `
        <article class="product-card">
            <a href="producto.html?id=${producto.id}" class="product-link">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" loading="lazy">
                <div class="product-info">
                    <h3 class="product-title">${producto.nombre}</h3>
                    <p class="product-description">${producto.descripcion}</p>
                    
                </div>
            </a>
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="window.location.href='producto.html?id=${producto.id}'" aria-label="Ver detalles de ${producto.nombre}">
                    Ver causa
                </button>

                <button class="add-to-cart-btn" onclick="mostrarModalDonacion(${producto.id})" aria-label="Donar a ${producto.nombre}">
                    Donar ahora
                </button>
            </div>
        </article>
    `).join('');
}

// Mostrar modal para ingresar monto personalizado
function mostrarModalDonacion(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const modal = document.createElement('div');
    modal.className = 'modal-donacion';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="cerrarModalDonacion()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="cerrarModalDonacion()" aria-label="Cerrar">×</button>
            <h3>Hacer donación</h3>
            <p class="modal-causa">${producto.nombre}</p>
            <p class="modal-descripcion">${producto.descripcion}</p>
            
            <div class="monto-input-group">
                <label for="montoPersonalizado">Ingresá el monto que deseas donar:</label>
                <div class="input-wrapper">
                    <span class="currency-symbol">$</span>
                    <input 
                        type="number" 
                        id="montoPersonalizado" 
                        min="100" 
                        step="100"
                        placeholder="Ej: ${producto.precioSugerido}"
                        aria-label="Monto a donar"
                    >
                </div>
                
            </div>

            <button class="btn-confirmar-donacion" onclick="confirmarDonacion(${producto.id})">
                Agregar donación
            </button>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.classList.add('active');
        document.getElementById('montoPersonalizado').focus();
    }, 10);

    // Cerrar con ESC
    document.addEventListener('keydown', cerrarConEscape);
}

function cerrarConEscape(e) {
    if (e.key === 'Escape') {
        cerrarModalDonacion();
    }
}

function cerrarModalDonacion() {
    const modal = document.querySelector('.modal-donacion');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    document.removeEventListener('keydown', cerrarConEscape);
}

function confirmarDonacion(id) {
    const montoInput = document.getElementById('montoPersonalizado');
    const monto = parseFloat(montoInput.value);

    if (!monto || monto < 100) {
        alert('Por favor, ingresá un monto válido (mínimo $100)');
        montoInput.focus();
        return;
    }

    agregarAlCarritoConMonto(id, monto);
    cerrarModalDonacion();
    
    // Redirigir al carrito
    setTimeout(() => {
        window.location.href = 'carrito.html';
    }, 300);
}

// Agregar donación al carrito con monto personalizado
function agregarAlCarritoConMonto(id, monto) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Agregar como nuevo item (cada donación es independiente)
    cart.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: monto,
        imagen: producto.imagen,
        quantity: 1,
        timestamp: Date.now() // Para diferenciar múltiples donaciones a la misma causa
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarContadorCarrito();
}

// Agregar a donación (legacy - redirige al modal)
function agregarAlCarrito(id) {
    mostrarModalDonacion(id);
}

// Formatear precio
function formatearPrecio(precio) {
    return precio.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
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

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', renderizarProductos);