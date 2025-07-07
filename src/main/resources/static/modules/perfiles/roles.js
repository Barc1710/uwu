// roles.js - Funcionalidad para la gestión de roles y el modal "Agregar Rol"

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const btnAgregarRol = document.querySelector('.btn-agregar-rol');
    const modal = document.getElementById('modalAgregarRol');
    const closeModal = document.getElementById('closeModal');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnAgregar = document.getElementById('btnAgregar');
    const form = {
        codigoRol: document.getElementById('codigoRol'),
        nombreRol: document.getElementById('nombreRol'),
        descripcionRol: document.getElementById('descripcionRol'),
        permisos: document.querySelectorAll('input[name="permisos"]')
    };

    // Abrir modal al hacer clic en "Agregar Rol"
    btnAgregarRol.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    });

    // Cerrar modal con la X
    closeModal.addEventListener('click', function() {
        cerrarModal();
    });

    // Cerrar modal con el botón "Cancelar"
    btnCancelar.addEventListener('click', function() {
        cerrarModal();
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            cerrarModal();
        }
    });

    // Función para cerrar el modal
    function cerrarModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
        limpiarFormulario();
    }

    // Función para limpiar el formulario
    function limpiarFormulario() {
        form.codigoRol.value = '';
        form.nombreRol.value = '';
        form.descripcionRol.value = '';
        form.permisos.forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    // Validar formulario
    function validarFormulario() {
        const codigo = form.codigoRol.value.trim();
        const nombre = form.nombreRol.value.trim();
        const descripcion = form.descripcionRol.value.trim();
        
        if (!codigo) {
            alert('Por favor, ingrese el código del rol');
            form.codigoRol.focus();
            return false;
        }
        
        if (!nombre) {
            alert('Por favor, ingrese el nombre del rol');
            form.nombreRol.focus();
            return false;
        }
        
        if (!descripcion) {
            alert('Por favor, ingrese una descripción del rol');
            form.descripcionRol.focus();
            return false;
        }
        
        return true;
    }

    // Obtener permisos seleccionados
    function obtenerPermisosSeleccionados() {
        const permisosSeleccionados = [];
        form.permisos.forEach(checkbox => {
            if (checkbox.checked) {
                permisosSeleccionados.push(checkbox.value);
            }
        });
        return permisosSeleccionados;
    }

    // Manejar el envío del formulario
    btnAgregar.addEventListener('click', function() {
        if (validarFormulario()) {
            const nuevoRol = {
                codigo: form.codigoRol.value.trim(),
                nombre: form.nombreRol.value.trim(),
                descripcion: form.descripcionRol.value.trim(),
                permisos: obtenerPermisosSeleccionados(),
                estado: 'Activo',
                usuarios: 0,
                fechaCreacion: new Date()
            };
            
            // Aquí se puede implementar la lógica para guardar el rol
            // Por ejemplo, enviar a una API o guardar en localStorage
            console.log('Nuevo rol creado:', nuevoRol);
            
            // Mostrar mensaje de éxito
            alert('Rol creado exitosamente');
            
            // Cerrar modal
            cerrarModal();
            
            // Aquí se puede agregar lógica para actualizar la vista con el nuevo rol
            // actualizarVistaRoles(nuevoRol);
        }
    });

    // Funcionalidad para los botones de editar y eliminar roles existentes
    document.addEventListener('click', function(event) {
        // Manejar botón editar
        if (event.target.closest('.btn-edit')) {
            const roleCard = event.target.closest('.role-card');
            const roleName = roleCard.querySelector('h3').textContent;
            console.log('Editando rol:', roleName);
            // Aquí se puede implementar la lógica para editar el rol
        }
        
        // Manejar botón eliminar
        if (event.target.closest('.btn-delete')) {
            const roleCard = event.target.closest('.role-card');
            const roleName = roleCard.querySelector('h3').textContent;
            
            if (confirm(`¿Está seguro de que desea eliminar el rol "${roleName}"?`)) {
                console.log('Eliminando rol:', roleName);
                // Aquí se puede implementar la lógica para eliminar el rol
                // roleCard.remove(); // Eliminar visualmente
            }
        }
    });

    // Funcionalidad del buscador
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    function filtrarRoles() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const roleCards = document.querySelectorAll('.role-card');
        
        roleCards.forEach(card => {
            const roleName = card.querySelector('h3').textContent.toLowerCase();
            const roleDescription = card.querySelector('.role-description p').textContent.toLowerCase();
            
            if (roleName.includes(searchTerm) || roleDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', filtrarRoles);
    
    // Búsqueda al hacer clic en el botón
    searchButton.addEventListener('click', filtrarRoles);
    
    // Búsqueda al presionar Enter
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            filtrarRoles();
        }
    });

    // Funcionalidad del filtro por estado
    const estadoSelect = document.getElementById('id-estado');
    
    estadoSelect.addEventListener('change', function() {
        const estadoSeleccionado = this.value;
        const roleCards = document.querySelectorAll('.role-card');
        
        roleCards.forEach(card => {
            const estadoRol = card.querySelector('.role-header span').textContent;
            
            if (estadoSeleccionado === '' || estadoRol.toLowerCase() === estadoSeleccionado) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
