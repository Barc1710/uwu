//=========================================
// Modal para agregar categorias
//=========================================
// Obtener elementos del modal
const modalCategoria = document.getElementById('modal-agregar-categoria');
const btnAgregarCategoria = document.querySelector('#agregar-categoria');
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
const btnAgregarMarca = document.querySelector('#agregar-marca');
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

// Fichero: modules/inventario/categorias.js

document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://localhost:8080/api/v1/categorias';

    // Elementos del DOM
    const tablaCategorias = document.getElementById('tabla-categorias');
    const btnNuevaCategoria = document.getElementById('btn-nueva-categoria');
    const modal = document.getElementById('modal-categoria');
    const modalTitulo = document.getElementById('modal-titulo');
    const formCategoria = document.getElementById('form-categoria');
    const inputId = document.getElementById('categoria-id');
    const inputNombre = document.getElementById('nombre');
    const inputDescripcion = document.getElementById('descripcion');
    const closeButton = document.querySelector('.close-button');

    let esModoEdicion = false;

    // --- FUNCIONES ---

    // Función para obtener y mostrar todas las categorías
    const cargarCategorias = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('No se pudo obtener las categorías.');
            
            const categorias = await response.json();
            tablaCategorias.innerHTML = ''; // Limpiar la tabla antes de cargar

            if (categorias.length === 0) {
                tablaCategorias.innerHTML = '<tr><td colspan="4">No hay categorías registradas.</td></tr>';
                return;
            }

            categorias.forEach(cat => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cat.idCategoria}</td>
                    <td>${cat.nombre}</td>
                    <td>${cat.descripcion || 'N/A'}</td>
                    <td>
                        <button class="btn-edit" data-id="${cat.idCategoria}">Editar</button>
                        <button class="btn-delete" data-id="${cat.idCategoria}">Eliminar</button>
                    </td>
                `;
                tablaCategorias.appendChild(tr);
            });
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    };

    // Función para manejar el guardado (Crear o Editar)
    const guardarCategoria = async (event) => {
        event.preventDefault();

        const categoriaData = {
            nombre: inputNombre.value,
            descripcion: inputDescripcion.value
        };

        const id = inputId.value;
        const url = esModoEdicion ? `${API_URL}/${id}` : API_URL;
        const method = esModoEdicion ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoriaData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar la categoría.');
            }
            
            cerrarModal();
            cargarCategorias(); // Recargar la tabla

        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar: ' + error.message);
        }
    };

    // Función para eliminar una categoría
    const eliminarCategoria = async (id) => {
        // Confirmación antes de eliminar
        if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

            if (!response.ok) throw new Error('No se pudo eliminar la categoría.');
            
            cargarCategorias(); // Recargar la tabla

        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };


    // --- MANEJO DEL MODAL ---
    const abrirModalParaCrear = () => {
        esModoEdicion = false;
        modalTitulo.textContent = 'Nueva Categoría';
        formCategoria.reset();
        inputId.value = '';
        modal.style.display = 'block';
    };

    const abrirModalParaEditar = async (id) => {
        esModoEdicion = true;
        modalTitulo.textContent = 'Editar Categoría';

        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('No se pudo obtener los datos de la categoría.');
            
            const cat = await response.json();
            inputId.value = cat.idCategoria;
            inputNombre.value = cat.nombre;
            inputDescripcion.value = cat.descripcion;
            modal.style.display = 'block';
        } catch (error) {
            console.error('Error al cargar datos para editar:', error);
        }
    };

    const cerrarModal = () => {
        modal.style.display = 'none';
    };

    // --- EVENT LISTENERS ---
    btnNuevaCategoria.addEventListener('click', abrirModalParaCrear);
    closeButton.addEventListener('click', cerrarModal);
    formCategoria.addEventListener('submit', guardarCategoria);
    
    tablaCategorias.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-edit')) {
            const id = event.target.dataset.id;
            abrirModalParaEditar(id);
        }
        if (event.target.classList.contains('btn-delete')) {
            const id = event.target.dataset.id;
            eliminarCategoria(id);
        }
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Carga inicial de datos
    cargarCategorias();
});