// =============================================== 
// FUNCIONALIDAD MODAL AGREGAR USUARIO
// =============================================== 

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del modal
    const btnAgregarUsuario = document.querySelector('.btn-agregar-usuario');
    const modalAgregarUsuario = document.getElementById('modalAgregarUsuario');
    const closeModalUsuario = document.getElementById('closeModalUsuario');
    const btnCancelarUsuario = document.getElementById('btnCancelarUsuario');
    const btnAgregarUsuarioConfirm = document.getElementById('btnAgregarUsuario');
    
    // Elementos de upload de imágenes
    const perfilUpload = document.getElementById('perfilUpload');
    const imagenUpload = document.getElementById('imagenUpload');
    const perfilImage = document.getElementById('perfilImage');
    const userImage = document.getElementById('userImage');

    // Abrir modal
    if (btnAgregarUsuario) {
        btnAgregarUsuario.addEventListener('click', function() {
            modalAgregarUsuario.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        });
    }

    // Cerrar modal
    function cerrarModal() {
        modalAgregarUsuario.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
        limpiarFormulario();
    }

    if (closeModalUsuario) {
        closeModalUsuario.addEventListener('click', cerrarModal);
    }

    if (btnCancelarUsuario) {
        btnCancelarUsuario.addEventListener('click', cerrarModal);
    }

    // Cerrar modal al hacer clic fuera del contenido
    modalAgregarUsuario.addEventListener('click', function(e) {
        if (e.target === modalAgregarUsuario) {
            cerrarModal();
        }
    });

    // Funcionalidad de upload de imágenes
    if (perfilUpload && perfilImage) {
        perfilUpload.addEventListener('click', function() {
            perfilImage.click();
        });

        perfilImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    perfilUpload.innerHTML = `
                        <img src="${e.target.result}" alt="Perfil" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (imagenUpload && userImage) {
        imagenUpload.addEventListener('click', function() {
            userImage.click();
        });

        userImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagenUpload.innerHTML = `
                        <img src="${e.target.result}" alt="Usuario" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Limpiar formulario
    function limpiarFormulario() {
        const form = modalAgregarUsuario.querySelector('.modal-body');
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="date"]');
        const selects = form.querySelectorAll('select');
        
        inputs.forEach(input => {
            input.value = '';
        });
        
        selects.forEach(select => {
            select.selectedIndex = 0;
        });

        // Resetear upload boxes
        if (perfilUpload) {
            perfilUpload.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>Perfil</span>
            `;
        }
        
        if (imagenUpload) {
            imagenUpload.innerHTML = `
                <i class="fas fa-upload"></i>
                <span>Subir Imagen</span>
            `;
        }
    }

    // Validación del DNI (solo números, máximo 8 dígitos)
    const dniInput = document.getElementById('dni');
    if (dniInput) {
        dniInput.addEventListener('input', function(e) {
            // Remover cualquier carácter que no sea número
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limitar a 8 dígitos
            if (this.value.length > 8) {
                this.value = this.value.slice(0, 8);
            }
        });
    }

    // Validación de contraseñas coincidentes
    const contrasenaInput = document.getElementById('contrasena');
    const repetirContrasenaInput = document.getElementById('repetirContrasena');
    
    if (contrasenaInput && repetirContrasenaInput) {
        function validarContrasenas() {
            if (repetirContrasenaInput.value && contrasenaInput.value !== repetirContrasenaInput.value) {
                repetirContrasenaInput.style.borderColor = 'var(--rojo)';
                repetirContrasenaInput.setCustomValidity('Las contraseñas no coinciden');
            } else {
                repetirContrasenaInput.style.borderColor = 'var(--neutral-100)';
                repetirContrasenaInput.setCustomValidity('');
            }
        }

        contrasenaInput.addEventListener('input', validarContrasenas);
        repetirContrasenaInput.addEventListener('input', validarContrasenas);
    }

    // Envío del formulario
    if (btnAgregarUsuarioConfirm) {
        btnAgregarUsuarioConfirm.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para enviar los datos del formulario
            console.log('Agregando nuevo usuario...');
            
            // Ejemplo de recolección de datos
            const datosUsuario = {
                nombres: document.getElementById('nombres').value,
                apellidos: document.getElementById('apellidos').value,
                dni: document.getElementById('dni').value,
                fechaNacimiento: document.getElementById('fechaNacimiento').value,
                genero: document.getElementById('genero').value,
                estadoCivil: document.getElementById('estadoCivil').value,
                usuario: document.getElementById('usuario').value,
                contrasena: document.getElementById('contrasena').value,
                fechaIngreso: document.getElementById('fechaIngreso').value,
                rol: document.getElementById('rol').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value
            };

            // Validación básica
            if (!datosUsuario.nombres || !datosUsuario.apellidos || !datosUsuario.dni || !datosUsuario.usuario || !datosUsuario.contrasena || !datosUsuario.email) {
                alert('Por favor, complete todos los campos obligatorios.');
                return;
            }

            console.log('Datos del usuario:', datosUsuario);
            
            // Aquí harías la petición al servidor
            // Por ahora solo cerramos el modal
            cerrarModal();
            alert('Usuario agregado exitosamente');
        });
    }
});