// ========================================
//    MODALES
// ========================================

//=========================================
// Modal para agregar productos
//=========================================
// Obtener elementos del modal
const modal = document.getElementById('modal-agregar-producto');
const btnAgregarProducto = document.querySelector('.agregar-producto');
const spanClose = document.querySelector('.close');

// Abrir modal cuando se hace clic en "Agregar Producto"
btnAgregarProducto.addEventListener('click', function() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
});

//=========================================
//=========================================


// Cerrar modal cuando se hace clic en la X
spanClose.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
});

// Cerrar modal cuando se hace clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
