//=========================================
// Modal para agregar productos
//=========================================
// Obtener elementos del modal
const modalproductos = document.getElementById('modal-agregar-producto');
const btnAgregarProducto = document.querySelector('.agregar-producto');
const spanCloseproductos = document.querySelector('#modal-agregar-producto .close');

// Abrir modal cuando se hace clic en "Agregar Producto"
btnAgregarProducto.addEventListener('click', function() {
    modalproductos.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
});

// Cerrar modal cuando se hace clic en la X
spanCloseproductos.addEventListener('click', function() {
    modalproductos.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
});

// Cerrar modal cuando se hace clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target === modalproductos) {
        modalproductos.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalproductos.style.display === 'block') {
        modalproductos.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

//=========================================
// Funciones para los botones del modal
//=========================================

// Función para guardar producto
document.addEventListener('DOMContentLoaded', function() {
    const btnGuardarProducto = document.getElementById('guardar-producto');
    const btnCancelarAgregar = document.getElementById('cancelar-agregar');
    
    if (btnGuardarProducto) {
        btnGuardarProducto.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para guardar el producto
            console.log('Guardando producto...');
            // Cerrar modal después de guardar
            modalproductos.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (btnCancelarAgregar) {
        btnCancelarAgregar.addEventListener('click', function() {
            modalproductos.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});

// ========================================
//    Funciones para Acciones de la tabla
// ========================================

function verProducto(id) {
    console.log('Ver producto con ID:', id);
    // Aquí irá la lógica para ver detalles del producto
}

function editarProducto(id) {
    console.log('Editar producto con ID:', id);
    // Aquí irá la lógica para editar el producto
}

function eliminarProducto(id) {
    console.log('Eliminar producto con ID:', id);
    // Aquí irá la lógica para eliminar el producto
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        // Lógica de eliminación
    }
}

// ========================================
//    Modal agregar imagen
// ========================================

// Función para previsualizar imagen en un upload-box
function previewImage(inputId) {
    const input = document.getElementById(inputId);
    const uploadBox = input.parentElement;
    // Eliminar previsualización anterior si existe
    const oldPreview = uploadBox.querySelector('.image-preview');
    if (oldPreview) oldPreview.remove();
    const oldRemoveBtn = uploadBox.querySelector('.remove-image');
    if (oldRemoveBtn) oldRemoveBtn.remove();
    uploadBox.classList.remove('has-image'); // Siempre quitar antes
    // Si hay archivo seleccionado
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Ocultar icono y texto
            uploadBox.querySelector('i').style.display = 'none';
            uploadBox.querySelector('.text-img').style.display = 'none';
            // Crear imagen de previsualización
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'image-preview';
            uploadBox.appendChild(img);
            // Crear botón para quitar imagen
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-image';
            removeBtn.type = 'button';
            removeBtn.innerHTML = '&times;';
            removeBtn.title = 'Quitar imagen';
            removeBtn.onclick = function(ev) {
                ev.stopPropagation();
                input.value = '';
                img.remove();
                removeBtn.remove();
                uploadBox.classList.remove('has-image');
                uploadBox.querySelector('i').style.display = '';
                uploadBox.querySelector('.text-img').style.display = '';
            };
            uploadBox.appendChild(removeBtn);
            uploadBox.classList.add('has-image');
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        // Si se elimina la selección, restaurar icono y texto
        uploadBox.querySelector('i').style.display = '';
        uploadBox.querySelector('.text-img').style.display = '';
        uploadBox.classList.remove('has-image');
    }
}

// Asignar eventos a los inputs de imagen
document.addEventListener('DOMContentLoaded', function() {
    const mainImageInput = document.getElementById('mainImage');
    const secondaryImageInput = document.getElementById('secondaryImage');

    if (mainImageInput) {
        mainImageInput.addEventListener('change', function() {
            previewImage('mainImage');
        });
    }
    if (secondaryImageInput) {
        secondaryImageInput.addEventListener('change', function() {
            previewImage('secondaryImage');
        });
    }
});
