// Datos de ejemplo para clientes
const clientesData = [
    {
        id: 1,
        nombre: "Frank Vásquez",
        usuario: "pepelucho",
        email: "pepe@gmail.com",
        estado: "activo",
        ultimoAcceso: "2025-06-11 17:20",
        tipoCliente: "persona-natural",
        tipoDocumento: "dni",
        numeroDocumento: "12345678"
    },
    {
        id: 2,
        nombre: "Joy Steven",
        usuario: "joytivi",
        email: "tivi@gmail.com",
        estado: "inactivo",
        ultimoAcceso: "2025-06-11 13:20",
        tipoCliente: "persona-natural",
        tipoDocumento: "dni",
        numeroDocumento: "87654321"
    },
    {
        id: 3,
        nombre: "Willy García",
        usuario: "willyto",
        email: "willyto@gamil.com",
        estado: "activo",
        ultimoAcceso: "2025-06-11 11:20",
        tipoCliente: "persona-natural",
        tipoDocumento: "dni",
        numeroDocumento: "11223344"
    },
    {
        id: 4,
        nombre: "Belther Rodas",
        usuario: "barc",
        email: "barc@gmail.com",
        estado: "activo",
        ultimoAcceso: "2025-06-10 13:20",
        tipoCliente: "persona-natural",
        tipoDocumento: "dni",
        numeroDocumento: "55667788"
    },
    {
        id: 5,
        nombre: "Heizen Guevara Perez",
        usuario: "HeizenPro",
        email: "heizen.gp27@gmail.com",
        estado: "activo",
        ultimoAcceso: "2025-06-26 14:30",
        tipoCliente: "persona-natural",
        tipoDocumento: "dni",
        numeroDocumento: "99887766"
    }
];

// Variable para almacenar los datos filtrados
let clientesFiltrados = [...clientesData];

// Función para formatear la fecha
function formatearFecha(fecha) {
    const date = new Date(fecha);
    const opciones = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return date.toLocaleDateString('es-ES', opciones);
}

// Función para crear las acciones de cada fila
function crearAcciones(cliente) {
    return `
        <div class="acciones">
            <button class="btn-accion btn-ver" onclick="verCliente(${cliente.id})" title="Ver detalles">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button class="btn-accion btn-editar" onclick="editarCliente(${cliente.id})" title="Editar">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="btn-accion btn-eliminar" onclick="eliminarCliente(${cliente.id})" title="Eliminar">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;
}

// Función para renderizar la tabla
function renderizarTabla(datos = clientesFiltrados) {
    console.log('Renderizando tabla con datos:', datos); // Debug
    const tbody = document.getElementById('clientesTableBody');
    
    if (!tbody) {
        console.error('No se encontró el tbody'); // Debug
        return;
    }
    
    if (datos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="loading-row">
                    No se encontraron clientes
                </td>
            </tr>
        `;
        return;
    }

    let htmlContent = '';
    datos.forEach((cliente, index) => {
        htmlContent += `
            <tr class="cliente-row-nueva">
                <td class="numero-fila">${index + 1}</td>
                <td class="cliente-nombre">${cliente.nombre}</td>
                <td class="cliente-usuario">${cliente.usuario}</td>
                <td class="cliente-email">${cliente.email}</td>
                <td><span class="estado-badge estado-${cliente.estado}">${cliente.estado === 'activo' ? 'Activo' : cliente.estado === 'inactivo' ? 'Inactivo' : 'Suspendido'}</span></td>
                <td class="ultimo-acceso">${formatearFecha(cliente.ultimoAcceso)}</td>
                <td>${crearAcciones(cliente)}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = htmlContent;
    console.log('Tabla actualizada con contenido'); // Debug
}

// Función para buscar clientes
function buscarClientes() {
    const searchInput = document.getElementById('search-input');
    const termino = searchInput.value.toLowerCase().trim();
    
    if (termino === '') {
        clientesFiltrados = [...clientesData];
    } else {
        clientesFiltrados = clientesData.filter(cliente => 
            cliente.nombre.toLowerCase().includes(termino) ||
            cliente.usuario.toLowerCase().includes(termino) ||
            cliente.email.toLowerCase().includes(termino) ||
            cliente.numeroDocumento.includes(termino)
        );
    }
    
    renderizarTabla(clientesFiltrados);
}

// Funciones para las acciones de los botones
function verCliente(id) {
    const cliente = clientesData.find(c => c.id === id);
    const info = `
        Nombre: ${cliente.nombre}
        Email: ${cliente.email}
        Tipo: ${cliente.tipoCliente}
        Documento: ${cliente.tipoDocumento.toUpperCase()} - ${cliente.numeroDocumento}
        Estado: ${cliente.estado}
        Usuario: ${cliente.usuario}
    `;
    alert(`Detalles del cliente:\n\n${info}`);
}

function editarCliente(id) {
    const cliente = clientesData.find(c => c.id === id);
    if (!cliente) {
        alert('Cliente no encontrado');
        return;
    }
    
    mostrarModalEditar(cliente);
}

function eliminarCliente(id) {
    const cliente = clientesData.find(c => c.id === id);
    if (confirm(`¿Está seguro de que desea eliminar a ${cliente.nombre}?`)) {
        const index = clientesData.findIndex(c => c.id === id);
        if (index > -1) {
            clientesData.splice(index, 1);
            clientesFiltrados = clientesFiltrados.filter(c => c.id !== id);
            renderizarTabla();
            alert('Cliente eliminado correctamente');
        }
    }
}

// Función para mostrar el modal de agregar cliente
function mostrarModalAgregar() {
    console.log('Ejecutando mostrarModalAgregar()...'); // Debug
    const modal = document.getElementById('modalAgregarUsuario');
    console.log('Modal encontrado:', !!modal); // Debug
    if (modal) {
        console.log('Cambiando display del modal a flex...'); // Debug
        modal.style.display = 'flex';
        limpiarFormulario();
        console.log('Modal mostrado exitosamente, display actual:', modal.style.display); // Debug
        
        // Verificar que el modal es visible
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(modal);
            console.log('Display computed del modal:', computedStyle.display);
            console.log('Visibility computed del modal:', computedStyle.visibility);
        }, 100);
    } else {
        console.error('ERROR: No se encontró el modal con ID modalAgregarUsuario'); // Debug
        alert('Error: No se puede abrir el modal. Revisa la consola para más detalles.');
    }
}

// Función para cerrar el modal
function cerrarModal() {
    console.log('Ejecutando cerrarModal()...'); // Debug
    const modal = document.getElementById('modalAgregarUsuario');
    if (modal) {
        console.log('Cerrando modal de agregar...'); // Debug
        modal.style.display = 'none';
        limpiarFormulario();
        console.log('Modal cerrado exitosamente'); // Debug
    } else {
        console.error('ERROR: No se encontró el modal para cerrar'); // Debug
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    const inputs = document.querySelectorAll('#modalAgregarUsuario input, #modalAgregarUsuario select');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('error', 'success');
    });
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar documento según tipo
function validarDocumento(tipo, numero) {
    switch(tipo) {
        case 'dni':
            return /^\d{8}$/.test(numero);
        case 'ruc':
            return /^\d{11}$/.test(numero);
        case 'ce':
            return /^\d{9}$/.test(numero);
        case 'pasaporte':
            return numero.length >= 6 && numero.length <= 12;
        default:
            return false;
    }
}

// Función para agregar un nuevo cliente
function agregarCliente() {
    // Obtener valores del formulario
    const tipoCliente = document.getElementById('tipoCliente').value.trim();
    const tipoDocumento = document.getElementById('tipoDocumento').value.trim();
    const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const razonSocial = document.getElementById('razonSocial').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    
    // Limpiar clases de error
    document.querySelectorAll('.form-group-nuevo input, .form-group-nuevo select').forEach(el => {
        el.classList.remove('error', 'success');
    });
    
    let hasErrors = false;
    
    // Validación básica
    if (!tipoCliente) {
        document.getElementById('tipoCliente').classList.add('error');
        hasErrors = true;
    }
    
    if (!tipoDocumento) {
        document.getElementById('tipoDocumento').classList.add('error');
        hasErrors = true;
    }
    
    if (!numeroDocumento) {
        document.getElementById('numeroDocumento').classList.add('error');
        hasErrors = true;
    } else if (!validarDocumento(tipoDocumento, numeroDocumento)) {
        document.getElementById('numeroDocumento').classList.add('error');
        alert(`Número de documento inválido para ${tipoDocumento.toUpperCase()}`);
        hasErrors = true;
    }
    
    if (!email) {
        document.getElementById('email').classList.add('error');
        hasErrors = true;
    } else if (!validarEmail(email)) {
        document.getElementById('email').classList.add('error');
        alert('Email inválido');
        hasErrors = true;
    }
    
    // Validar que tenga nombre/apellidos O razón social según el tipo
    if (tipoCliente === 'persona-natural') {
        if (!nombres) {
            document.getElementById('nombres').classList.add('error');
            hasErrors = true;
        }
        if (!apellidos) {
            document.getElementById('apellidos').classList.add('error');
            hasErrors = true;
        }
    } else if ((tipoCliente === 'persona-juridica' || tipoCliente === 'empresa') && !razonSocial) {
        document.getElementById('razonSocial').classList.add('error');
        hasErrors = true;
    }
    
    if (hasErrors) {
        alert('Por favor, corrija los campos marcados en rojo');
        return;
    }
    
    // Verificar que el documento no exista
    if (clientesData.some(c => c.numeroDocumento === numeroDocumento)) {
        document.getElementById('numeroDocumento').classList.add('error');
        alert('El número de documento ya existe');
        return;
    }
    
    // Verificar que el email no exista
    if (clientesData.some(c => c.email === email)) {
        document.getElementById('email').classList.add('error');
        alert('El email ya está registrado');
        return;
    }
    
    // Crear nombre para mostrar
    let nombreCompleto;
    if (tipoCliente === 'persona-natural') {
        nombreCompleto = `${nombres} ${apellidos}`;
    } else {
        nombreCompleto = razonSocial;
    }
    
    // Generar usuario automáticamente
    let usuario;
    if (tipoCliente === 'persona-natural') {
        usuario = `${nombres.toLowerCase().split(' ')[0]}.${apellidos.toLowerCase().split(' ')[0]}`;
    } else {
        usuario = razonSocial.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '').substring(0, 20);
    }
    
    // Asegurar que el usuario sea único
    let contador = 1;
    const usuarioBase = usuario;
    while (clientesData.some(c => c.usuario === usuario)) {
        usuario = `${usuarioBase}${contador}`;
        contador++;
    }
    
    // Crear nuevo cliente
    const nuevoCliente = {
        id: Math.max(...clientesData.map(c => c.id)) + 1,
        nombre: nombreCompleto,
        usuario: usuario,
        email: email,
        estado: 'activo',
        ultimoAcceso: new Date().toISOString().slice(0, 16).replace('T', ' '),
        tipoCliente: tipoCliente,
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
        telefono: telefono || 'No especificado'
    };
    
    // Agregar a los datos
    clientesData.push(nuevoCliente);
    clientesFiltrados.push(nuevoCliente);
    
    // Renderizar tabla, mostrar mensaje y cerrar modal
    renderizarTabla();
    alert('Cliente agregado correctamente');
    cerrarModal();
}

// Función para manejar cambios en tipo de cliente
function manejarTipoCliente() {
    const tipoCliente = document.getElementById('tipoCliente').value;
    const nombresGroup = document.getElementById('nombres').closest('.form-group-nuevo');
    const apellidosGroup = document.getElementById('apellidos').closest('.form-group-nuevo');
    const razonSocialGroup = document.getElementById('razonSocial').closest('.form-group-nuevo');
    
    if (tipoCliente === 'persona-natural') {
        nombresGroup.style.display = 'flex';
        apellidosGroup.style.display = 'flex';
        razonSocialGroup.style.display = 'none';
        document.getElementById('razonSocial').value = '';
    } else if (tipoCliente === 'persona-juridica' || tipoCliente === 'empresa') {
        nombresGroup.style.display = 'none';
        apellidosGroup.style.display = 'none';
        razonSocialGroup.style.display = 'flex';
        document.getElementById('nombres').value = '';
        document.getElementById('apellidos').value = '';
    } else {
        nombresGroup.style.display = 'flex';
        apellidosGroup.style.display = 'flex';
        razonSocialGroup.style.display = 'flex';
    }
}

// ====== FUNCIONES PARA MODAL DE EDICIÓN ======

// Variable para almacenar el ID del cliente que se está editando
let clienteEditandoId = null;

// Función para mostrar el modal de edición
function mostrarModalEditar(cliente) {
    console.log('Mostrando modal editar cliente:', cliente); // Debug
    const modal = document.getElementById('modalEditarUsuario');
    if (modal) {
        clienteEditandoId = cliente.id;
        cargarDatosEnModalEditar(cliente);
        modal.style.display = 'flex';
        console.log('Modal de edición mostrado exitosamente'); // Debug
    } else {
        console.error('No se encontró el modal con ID modalEditarUsuario'); // Debug
    }
}

// Función para cargar los datos del cliente en el modal de edición
function cargarDatosEnModalEditar(cliente) {
    // Campos básicos
    document.getElementById('editTipoCliente').value = cliente.tipoCliente || '';
    document.getElementById('editTipoDocumento').value = cliente.tipoDocumento || '';
    document.getElementById('editNumeroDocumento').value = cliente.numeroDocumento || '';
    document.getElementById('editEmail').value = cliente.email || '';
    document.getElementById('editTelefono').value = cliente.telefono || '';
    
    // Determinar nombres y apellidos o razón social
    if (cliente.tipoCliente === 'persona-natural') {
        // Para persona natural, intentar dividir el nombre
        const partesNombre = cliente.nombre.split(' ');
        if (partesNombre.length >= 2) {
            document.getElementById('editNombres').value = partesNombre[0] || '';
            document.getElementById('editApellidos').value = partesNombre.slice(1).join(' ') || '';
        } else {
            document.getElementById('editNombres').value = cliente.nombre || '';
            document.getElementById('editApellidos').value = '';
        }
        document.getElementById('editRazonSocial').value = '';
    } else {
        // Para persona jurídica o empresa
        document.getElementById('editNombres').value = '';
        document.getElementById('editApellidos').value = '';
        document.getElementById('editRazonSocial').value = cliente.nombre || '';
    }
    
    // Campos opcionales
    document.getElementById('editGenero').value = cliente.genero || '';
    document.getElementById('editEstadoCivil').value = cliente.estadoCivil || '';
    document.getElementById('editFechaNacimiento').value = cliente.fechaNacimiento || '';
    
    // Manejar visibilidad de campos según tipo de cliente
    manejarTipoClienteEditar();
}

// Función para cerrar el modal de edición
function cerrarModalEditar() {
    console.log('Ejecutando cerrarModalEditar()...'); // Debug
    const modal = document.getElementById('modalEditarUsuario');
    if (modal) {
        console.log('Cerrando modal de editar...'); // Debug
        modal.style.display = 'none';
        limpiarFormularioEditar();
        clienteEditandoId = null;
        console.log('Modal de editar cerrado exitosamente'); // Debug
    } else {
        console.error('ERROR: No se encontró el modal de editar para cerrar'); // Debug
    }
}

// Función para limpiar el formulario de edición
function limpiarFormularioEditar() {
    const inputs = document.querySelectorAll('#modalEditarUsuario input, #modalEditarUsuario select');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('error', 'success');
    });
}

// Función para manejar cambios en tipo de cliente en edición
function manejarTipoClienteEditar() {
    const tipoCliente = document.getElementById('editTipoCliente').value;
    const nombresGroup = document.getElementById('editNombres').closest('.form-group-nuevo');
    const apellidosGroup = document.getElementById('editApellidos').closest('.form-group-nuevo');
    const razonSocialGroup = document.getElementById('editRazonSocial').closest('.form-group-nuevo');
    
    if (tipoCliente === 'persona-natural') {
        nombresGroup.style.display = 'flex';
        apellidosGroup.style.display = 'flex';
        razonSocialGroup.style.display = 'none';
        document.getElementById('editRazonSocial').value = '';
    } else if (tipoCliente === 'persona-juridica' || tipoCliente === 'empresa') {
        nombresGroup.style.display = 'none';
        apellidosGroup.style.display = 'none';
        razonSocialGroup.style.display = 'flex';
        document.getElementById('editNombres').value = '';
        document.getElementById('editApellidos').value = '';
    } else {
        nombresGroup.style.display = 'flex';
        apellidosGroup.style.display = 'flex';
        razonSocialGroup.style.display = 'flex';
    }
}

// Función para guardar los cambios del cliente
function guardarCambiosCliente() {
    if (!clienteEditandoId) {
        alert('Error: No se puede identificar el cliente a editar');
        return;
    }
    
    // Obtener valores del formulario de edición
    const tipoCliente = document.getElementById('editTipoCliente').value.trim();
    const tipoDocumento = document.getElementById('editTipoDocumento').value.trim();
    const numeroDocumento = document.getElementById('editNumeroDocumento').value.trim();
    const nombres = document.getElementById('editNombres').value.trim();
    const apellidos = document.getElementById('editApellidos').value.trim();
    const razonSocial = document.getElementById('editRazonSocial').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const telefono = document.getElementById('editTelefono').value.trim();
    const genero = document.getElementById('editGenero').value.trim();
    const estadoCivil = document.getElementById('editEstadoCivil').value.trim();
    const fechaNacimiento = document.getElementById('editFechaNacimiento').value.trim();
    
    // Limpiar clases de error
    document.querySelectorAll('#modalEditarUsuario .form-group-nuevo input, #modalEditarUsuario .form-group-nuevo select').forEach(el => {
        el.classList.remove('error', 'success');
    });
    
    let hasErrors = false;
    
    // Validación básica
    if (!tipoCliente) {
        document.getElementById('editTipoCliente').classList.add('error');
        hasErrors = true;
    }
    
    if (!tipoDocumento) {
        document.getElementById('editTipoDocumento').classList.add('error');
        hasErrors = true;
    }
    
    if (!numeroDocumento) {
        document.getElementById('editNumeroDocumento').classList.add('error');
        hasErrors = true;
    } else if (!validarDocumento(tipoDocumento, numeroDocumento)) {
        document.getElementById('editNumeroDocumento').classList.add('error');
        alert(`Número de documento inválido para ${tipoDocumento.toUpperCase()}`);
        hasErrors = true;
    }
    
    if (!email) {
        document.getElementById('editEmail').classList.add('error');
        hasErrors = true;
    } else if (!validarEmail(email)) {
        document.getElementById('editEmail').classList.add('error');
        alert('Email inválido');
        hasErrors = true;
    }
    
    // Validar que tenga nombre/apellidos O razón social según el tipo
    if (tipoCliente === 'persona-natural') {
        if (!nombres) {
            document.getElementById('editNombres').classList.add('error');
            hasErrors = true;
        }
        if (!apellidos) {
            document.getElementById('editApellidos').classList.add('error');
            hasErrors = true;
        }
    } else if ((tipoCliente === 'persona-juridica' || tipoCliente === 'empresa') && !razonSocial) {
        document.getElementById('editRazonSocial').classList.add('error');
        hasErrors = true;
    }
    
    if (hasErrors) {
        alert('Por favor, corrija los campos marcados en rojo');
        return;
    }
    
    // Buscar el cliente actual
    const clienteIndex = clientesData.findIndex(c => c.id === clienteEditandoId);
    if (clienteIndex === -1) {
        alert('Error: Cliente no encontrado');
        return;
    }
    
    const clienteActual = clientesData[clienteIndex];
    
    // Verificar que el documento no exista en otro cliente
    if (clientesData.some(c => c.id !== clienteEditandoId && c.numeroDocumento === numeroDocumento)) {
        document.getElementById('editNumeroDocumento').classList.add('error');
        alert('El número de documento ya existe en otro cliente');
        return;
    }
    
    // Verificar que el email no exista en otro cliente
    if (clientesData.some(c => c.id !== clienteEditandoId && c.email === email)) {
        document.getElementById('editEmail').classList.add('error');
        alert('El email ya está registrado en otro cliente');
        return;
    }
    
    // Crear nombre para mostrar
    let nombreCompleto;
    if (tipoCliente === 'persona-natural') {
        nombreCompleto = `${nombres} ${apellidos}`;
    } else {
        nombreCompleto = razonSocial;
    }
    
    // Actualizar el cliente
    clientesData[clienteIndex] = {
        ...clienteActual,
        nombre: nombreCompleto,
        email: email,
        tipoCliente: tipoCliente,
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
        telefono: telefono || 'No especificado',
        genero: genero,
        estadoCivil: estadoCivil,
        fechaNacimiento: fechaNacimiento
    };
    
    // Actualizar también en clientesFiltrados
    const filtradoIndex = clientesFiltrados.findIndex(c => c.id === clienteEditandoId);
    if (filtradoIndex !== -1) {
        clientesFiltrados[filtradoIndex] = clientesData[clienteIndex];
    }
    
    // Renderizar tabla, mostrar mensaje y cerrar modal
    renderizarTabla();
    alert('Cliente actualizado correctamente');
    cerrarModalEditar();
}

// ====== FIN FUNCIONES MODAL DE EDICIÓN ======

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - iniciando configuración clientes'); // Debug
    console.log('Datos de clientes:', clientesData); // Debug
    
    // Verificar que Font Awesome esté cargado
    console.log('Font Awesome cargado:', !!window.FontAwesome || !!document.querySelector('link[href*="font-awesome"]'));
    
    // Verificar que existe el tbody
    const tbody = document.getElementById('clientesTableBody');
    if (tbody) {
        console.log('Tbody encontrado'); // Debug
    } else {
        console.error('No se encontró el tbody con ID clientesTableBody'); // Debug
    }
    
    // Renderizar tabla inicial
    renderizarTabla();
    console.log('Tabla renderizada'); // Debug
    
    // Configurar búsqueda
    const searchInput = document.getElementById('search-input');
    const btnBuscar = document.querySelector('.btn-buscar');
    
    if (searchInput) {
        searchInput.addEventListener('input', buscarClientes);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarClientes();
            }
        });
    }
    
    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarClientes);
    }
    
    // Configurar botón agregar cliente
    const btnAgregar = document.querySelector('.btn-agregar-usuario');
    console.log('Botón agregar encontrado:', !!btnAgregar); // Debug
    if (btnAgregar) {
        console.log('Configurando event listener para botón agregar'); // Debug
        btnAgregar.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón agregar cliente clickeado'); // Debug
            mostrarModalAgregar();
        });
        console.log('Event listener configurado exitosamente'); // Debug
    } else {
        console.error('No se encontró el botón agregar cliente con clase .btn-agregar-usuario'); // Debug
    }
    
    // Verificar si existen los modales
    const modalAgregar = document.getElementById('modalAgregarUsuario');
    const modalEditar = document.getElementById('modalEditarUsuario');
    
    if (modalAgregar) {
        console.log('Modal agregar encontrado correctamente'); // Debug
    } else {
        console.error('Modal agregar no encontrado'); // Debug
    }
    
    if (modalEditar) {
        console.log('Modal editar encontrado correctamente'); // Debug
    } else {
        console.error('Modal editar no encontrado'); // Debug
    }
    
    // ====== CONFIGURAR MODAL AGREGAR ======
    const closeModal = document.getElementById('closeModalUsuario');
    const btnAgregarUsuario = document.getElementById('btnAgregarUsuario');
    const btnCancelarUsuario = document.getElementById('btnCancelarUsuario');
    
    console.log('Elementos del modal agregar encontrados:'); // Debug
    console.log('- closeModal:', !!closeModal); // Debug
    console.log('- btnAgregarUsuario:', !!btnAgregarUsuario); // Debug
    console.log('- btnCancelarUsuario:', !!btnCancelarUsuario); // Debug
    
    if (closeModal) {
        closeModal.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón cerrar modal clickeado'); // Debug
            cerrarModal();
        });
        console.log('Event listener configurado para closeModal'); // Debug
    } else {
        console.error('ERROR: No se encontró el botón closeModalUsuario'); // Debug
    }
    
    if (btnAgregarUsuario) {
        btnAgregarUsuario.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón agregar usuario clickeado'); // Debug
            agregarCliente();
        });
        console.log('Event listener configurado para btnAgregarUsuario'); // Debug
    } else {
        console.error('ERROR: No se encontró el botón btnAgregarUsuario'); // Debug
    }
    
    if (btnCancelarUsuario) {
        btnCancelarUsuario.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón cancelar usuario clickeado'); // Debug
            cerrarModal();
        });
        console.log('Event listener configurado para btnCancelarUsuario'); // Debug
    } else {
        console.error('ERROR: No se encontró el botón btnCancelarUsuario'); // Debug
    }
    
    // ====== CONFIGURAR MODAL EDITAR ======
    const closeModalEditar = document.getElementById('closeModalEditarUsuario');
    const btnGuardarEditarUsuario = document.getElementById('btnGuardarEditarUsuario');
    const btnCancelarEditarUsuario = document.getElementById('btnCancelarEditarUsuario');
    
    console.log('Elementos del modal editar encontrados:'); // Debug
    console.log('- closeModalEditar:', !!closeModalEditar); // Debug
    console.log('- btnGuardarEditarUsuario:', !!btnGuardarEditarUsuario); // Debug
    console.log('- btnCancelarEditarUsuario:', !!btnCancelarEditarUsuario); // Debug
    
    if (closeModalEditar) {
        closeModalEditar.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón cerrar modal editar clickeado'); // Debug
            cerrarModalEditar();
        });
        console.log('Event listener configurado para closeModalEditar'); // Debug
    } else {
        console.error('ERROR: No se encontró el botón closeModalEditarUsuario'); // Debug
    }
    
    if (btnGuardarEditarUsuario) {
        btnGuardarEditarUsuario.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón guardar editar usuario clickeado'); // Debug
            guardarCambiosCliente();
        });
        console.log('Event listener configurado para btnGuardarEditarUsuario'); // Debug
    } else {
        console.error('ERROR: No se encontró el botón btnGuardarEditarUsuario'); // Debug
    }
    
    if (btnCancelarEditarUsuario) {
        btnCancelarEditarUsuario.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón cancelar editar usuario clickeado'); // Debug
            cerrarModalEditar();
        });
        console.log('Event listener configurado para btnCancelarEditarUsuario'); // Debug
    } else {
        console.error('ERROR: No se encontró el botón btnCancelarEditarUsuario'); // Debug
    }
    
    // Configurar tipo de cliente para ambos modales
    const tipoClienteSelect = document.getElementById('tipoCliente');
    const editTipoClienteSelect = document.getElementById('editTipoCliente');
    
    if (tipoClienteSelect) {
        tipoClienteSelect.addEventListener('change', manejarTipoCliente);
    }
    
    if (editTipoClienteSelect) {
        editTipoClienteSelect.addEventListener('change', manejarTipoClienteEditar);
    }
    
    // Validación en tiempo real para modal agregar
    const inputs = document.querySelectorAll('#modalAgregarUsuario input, #modalAgregarUsuario select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
            }
        });
    });
    
    // Validación en tiempo real para modal editar
    const editInputs = document.querySelectorAll('#modalEditarUsuario input, #modalEditarUsuario select');
    editInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
            }
        });
    });
});

// Función para exportar datos (funcionalidad adicional)
function exportarClientes() {
    const dataStr = JSON.stringify(clientesData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clientes.json';
    link.click();
}

// Funciones de prueba para debuggear los modales (puedes ejecutarlas desde la consola)
function testAbrirModalAgregar() {
    console.log('Probando abrir modal agregar...');
    mostrarModalAgregar();
}

function testAbrirModalEditar() {
    console.log('Probando abrir modal editar...');
    const cliente = clientesData[0]; // Usar el primer cliente como ejemplo
    editarCliente(cliente.id);
}

// Hacer las funciones disponibles globalmente para testing
window.testAbrirModalAgregar = testAbrirModalAgregar;
window.testAbrirModalEditar = testAbrirModalEditar;
window.mostrarModalAgregar = mostrarModalAgregar;
window.editarCliente = editarCliente;
