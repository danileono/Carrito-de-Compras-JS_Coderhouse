// obtener el div del HTML donde se renderizan los notebooks agregados
const carritoContainer = document.getElementById('carrito');

// obtener los notebooks del localStorage con array vacio
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];



// funcion para iniciar el carrito si esta vacio
function inicializarCarrito() {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Obtener datos del localStorage

    if (!carrito || carrito.length === 0) {
        carrito = []; // Si no hay datos, inicializar como un array vacio
        localStorage.setItem('carrito', JSON.stringify(carrito)); // guardar en localStorage
    }
}

// funcion para renderizar el carrito
function renderizarCarrito() {
    carritoContainer.innerHTML = ''; // se limpia el contenedor antes de renderizar
    let totalCarrito = 0; // el total inicia en 0

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<h5 class ="text-center text-primary my-5">El carrito está vacío :( <br><br> Por favor vuelve a la Tienda y agrega tus productos</h5>';
    } else {
        carrito.forEach((notebook, index) => {
            // Se asegura que notebook.cantidad sea un numero valido y se inicia el contador en cantidad 1
            notebook.cantidad = parseInt(notebook.cantidad) || 1;

            const subtotal = notebook.precio * notebook.cantidad; 
            totalCarrito += subtotal; //precio x cantidad da el subtotal



            //esta es la card que renderiza carrito.html
            const notebookHTML = `
                <div class="col-lg-3 col-md-6 text-center mb-3">
                    <div class="card h-100">
                        <img class="card-img-top w-75 align-self-center" src="${notebook.img}" alt="${notebook.nombre}">
                        <div class="card-body pt-0">
                            <h4 class="card-title">${notebook.nombre}</h4>
                            <p class="card-text my-1"><strong>Marca:</strong> ${notebook.marca}</p>
                            <p class="card-text my-1"><strong>Precio:</strong> ${formatCurrency(notebook.precio)}</p>
                            <div class="input-group mb-3">
                                <button class="btn btn-outline-secondary btn-sm btn-quitar" type="button" data-index="${index}">-</button>
                                <input type="text" class="form-control cantidad text-center" value="${notebook.cantidad}" readonly>
                                <button class="btn btn-outline-secondary btn-sm btn-agregar" type="button" data-index="${index}">+</button>
                            </div>
                            <p class="card-text"><strong>Subtotal: <span class="card-text text-danger"> ${formatCurrency(subtotal)}</span></strong> </p>
                            <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
            carritoContainer.innerHTML += notebookHTML;
        });
    }

    // mostrar el total del carrito en la parte de abajo de la pagina
    const totalHTML = `
        <div class="col-lg-12 text-center mt-3">
            <h3>Total del Carrito: ${formatCurrency(totalCarrito)}</h3>
        </div>
    `;
    carritoContainer.innerHTML += totalHTML;

    configurarEventos(); // se configuran los eventos despues de renderizar
}

// Funcion para configurar eventos después de la renderización del carrito
function configurarEventos() {
    // configuracion de eventos de agregar y quitar cantidad
    const botonesAgregar = document.getElementsByClassName('btn-agregar');
    const botonesQuitar = document.getElementsByClassName('btn-quitar');
    const botonesEliminar = document.getElementsByClassName('btn-eliminar');

    Array.from(botonesAgregar).forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            aumentarCantidad(index);
        });
    });

    Array.from(botonesQuitar).forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            disminuirCantidad(index);
        });
    });

    Array.from(botonesEliminar).forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            eliminarNotebook(index);
        });
    });
}



// Funcion para formatear numeros como moneda (chilena)
function formatCurrency(amount) {
    return amount.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

// Funcion para aumentar la cantidad de un producto en el carrito
function aumentarCantidad(index) {
    carrito[index].cantidad++;
    actualizarCarrito();
}

// Funcion para disminuir la cantidad de un producto en el carrito
function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarCarrito();
    }
}

// Funcion para eliminar un notebook del carrito
function eliminarNotebook(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito(); // se llama a la funcion para actualizar la visualizacion del carrito
}

// Funcion para actualizar el carrito en localStorage y renderizar
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

// Llamado inicial para inicializar y renderizar el carrito al cargar la pagina
inicializarCarrito();
renderizarCarrito();


// Evento btn para vaciar el carrito
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener('click', () => {
        // Eliminar datos del localStorage y del array carrito
        localStorage.removeItem('carrito');
        carrito = [];
        renderizarCarrito(); // Renderizar de nuevo despues de vaciar el carrito
    });
}





//////////////// CONFIGURACION DEL MODAL PARA PAGAR ///////////////////
//////////////// CONFIGURACION DEL MODAL PARA PAGAR ///////////////////
//////////////// CONFIGURACION DEL MODAL PARA PAGAR ///////////////////

// se trae al boton y al modal por su ID
let pagarModal = document.getElementById('pagarModal');
let modalParaPagar = new bootstrap.Modal(document.getElementById('modalParaPagar')); 

// Se agrega evento de click al boton "Ir a pagar" para abrir el modal
pagarModal.addEventListener('click', function() {
    renderizarCarritoModal(); // Renderizar el carrito en el modal antes de abrirlo
    modalParaPagar.show(); // Mostrar el modal
});

// Funcin para renderizar el carrito en el modal
function renderizarCarritoModal() {
    const modalBodyCarrito = document.getElementById('modalBodyCarrito');
    modalBodyCarrito.innerHTML = ''; // Se limpia el contenido anterior

    let totalCarrito = 0;

    if (carrito.length === 0) {
        modalBodyCarrito.innerHTML = '<h5 class="text-center my-5">El carrito está vacío :( <br><br> Por favor vuelve a la Tienda y agrega tus productos</h5>';
    } else {
        carrito.forEach((notebook, index) => {
            notebook.cantidad = parseInt(notebook.cantidad) || 1;

            const subtotal = notebook.precio * notebook.cantidad;
            totalCarrito += subtotal;
            // Esta es la card que se renderiza dentro del Modal de pago
            const notebookHTML = `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${notebook.img}" class="img-fluid rounded-start" alt="${notebook.nombre}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${notebook.nombre}</h5>
                                <p class="card-text my-1"><strong>Marca:</strong> ${notebook.marca}</p>
                                <p class="card-text my-1"><strong>Cantidad:</strong> ${notebook.cantidad}</p>
                                <div class="input-group mb-3 w-50">
                                    <button class="btn btn-outline-secondary btn-sm btn-quitar-modal" type="button" data-index="${index}">-</button>
                                    <input type="text" class="form-control cantidad-modal text-center" value="${notebook.cantidad}" readonly>
                                    <button class="btn btn-outline-secondary btn-sm btn-agregar-modal" type="button" data-index="${index}">+</button>
                                </div>
                                <p class="card-text my-1"><strong>Subtotal: ${formatCurrency(subtotal)}</strong></p>
                                <button type="button" class="btn btn-danger btn-sm btn-eliminar-modal" data-index="${index}">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            modalBodyCarrito.innerHTML += notebookHTML;
        });
    }

    // Mostrar el total del carrito en el modal
    const totalHTML = `
        <div class="text-center mt-3">
            <h5>Total de tu Carrito: ${formatCurrency(totalCarrito)}</h5>
        </div>
    `;
    modalBodyCarrito.innerHTML += totalHTML;

    configurarEventosModal(); // Se configuran los eventos despues de renderizar en el modal
}

// Funcion para configurar eventos en el modal
function configurarEventosModal() {
    const botonesAgregarModal = document.getElementsByClassName('btn-agregar-modal');
    const botonesQuitarModal = document.getElementsByClassName('btn-quitar-modal');
    const botonesEliminarModal = document.getElementsByClassName('btn-eliminar-modal');

    // configuracion btn Agregar dentro del modal
    for (let i = 0; i < botonesAgregarModal.length; i++) {
        botonesAgregarModal[i].addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            aumentarCantidadModal(index);
            renderizarCarritoModal(); // Se renderiza de nuevo en el modal despues de cambiar la cantidad
        });
    }
// configuracion btn Quitar dentro del modal
    for (let i = 0; i < botonesQuitarModal.length; i++) {
        botonesQuitarModal[i].addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            disminuirCantidadModal(index);
            renderizarCarritoModal(); // Se renderiza de nuevo en el modal despues de cambiar la cantidad
        });
    }
// configuracion btn Eliminar dentro del modal
    for (let i = 0; i < botonesEliminarModal.length; i++) {
        botonesEliminarModal[i].addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            eliminarNotebook(index);
            renderizarCarritoModal(); // Se renderiza de nuevo en el modal despues de eliminar un producto
        });
    }
}


////////////  FUNCIONES QUE OCUREN DENTRO DEL MODAL  ////////////
////////////  FUNCIONES QUE OCUREN DENTRO DEL MODAL  ////////////

// Funcion para aumentar la cantidad de un notebook en el carrito en el modal
function aumentarCantidadModal(index) {
    carrito[index].cantidad++;
    actualizarCarrito();
}

// Funcion para disminuir la cantidad de un notebook en el carrito en el modal
function disminuirCantidadModal(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarCarrito();
    }
}

// Llamado inicial para renderizar el carrito en el modal al cargar la pagina
renderizarCarritoModal();
configurarEventosModal(); // Configurar eventos despues de renderizar en el modal


// Evento para abrir el mensaje de pago exitoso al hacer click en el btn "Pagar tus productos" que esta dentro del modal
const pagarModalBtn = document.getElementById('pagarModal');
pagarModalBtn.addEventListener('click', function() {
    renderizarCarritoModal(); // Renderizar el carrito en el modal antes de abrirlo
    modaParaPagar.show(); // Mostrar el mensaje
});

//Funcion del evento para abrir el mensaje de pago exitoso
function pagarEnModalBtn() {
    const btnPagarModal = document.getElementById('pagarModalBtn');
    btnPagarModal.addEventListener('click', function() {
        Swal.fire({
            title: "Pago realizado con Éxito",
            text: "Notificaremos el pago al correo ingresado",
            icon: "success"
        }).then(() => {
            limpiarCarrito(); // Limpia el carrito despues de mostrar el mensaje de exito
            modalParaPagar.hide(); //cerrar el modal despues de pagar
        });
    });
}
pagarEnModalBtn()

// Funcion para limpiar el carrito y actualizar la pagina
function limpiarCarrito() {
    localStorage.removeItem('carrito'); // Se eliminan los datos del localStorage
    carrito = []; // Se limpia el array carrito
    renderizarCarrito(); // y se vuelve a renderizar el carrito vacio
}



//FIN

    