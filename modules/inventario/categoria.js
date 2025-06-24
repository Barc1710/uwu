//=========================================
// Modal para agregar categorias
//=========================================
// Obtener elementos del modal
const modalCategoria = document.getElementById('modal-agregar-categoria');
const btnAgregarCategoria = document.querySelector('.agregar-categoria');
const spanCloseCategoria = document.querySelector('#modal-agregar-categoria .close');

// Abrir modal cuando se hace clic en "Agregar Oferta"
btnAgregarCategoria.addEventListener('click', function() {
    modalCategoria.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
});

// Cerrar modal cuando se hace clic en la X
spanCloseCategoria.addEventListener('click', function() {
    modalCategoria.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
});

// Cerrar modal cuando se hace clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target === modalCategoria) {
        modalCategoria.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalCategoria.style.display === 'block') {
        modalCategoria.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


//=========================================
// Modal para agregar marca
//=========================================
// Obtener elementos del modal
const modalMarca = document.getElementById('modal-agregar-marca');
const btnAgregarMarca = document.querySelector('.agregar-marca');
const spanCloseMarca = document.querySelector('#modal-agregar-marca .close');

// Abrir modal cuando se hace clic en "Agregar Marca"
btnAgregarMarca.addEventListener('click', function() {
    modalMarca.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
});

// Cerrar modal cuando se hace clic en la X
spanCloseMarca.addEventListener('click', function() {
    modalMarca.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
});

// Cerrar modal cuando se hace clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target === modalMarca) {
        modalMarca.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalMarca.style.display === 'block') {
        modalMarca.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});