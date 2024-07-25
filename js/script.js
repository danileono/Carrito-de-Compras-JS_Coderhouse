// Se cargan notebooks/laptops desde el JSON con fetch
async function cargarNotebooks() {
    try {
        const response = await fetch("./db/notebooks.json");
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json();
        notebooks = data; 
        renderizarNotebooks();
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al cargar el archivo JSON',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    } 
}

cargarNotebooks();





// Funcion para renderizar cards en cardsContainer
function renderizarNotebooks() {
    let cardsContainer = document.getElementById('cardsContainer');

    if (!cardsContainer) {
        console.error('Elemento con ID cardsContainer no encontrado en el DOM.');
        return;
    }

    cardsContainer.innerHTML = '';

    notebooks.forEach(notebook => {
        let card = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-6', 'text-center', 'mb-3');

        // Se añade el atributo "data-marca" con el valor de notebook.marca para usarlo en el filtro del input de busqueda
        card.setAttribute('data-marca', notebook.marca.toLowerCase());

        card.innerHTML = `
            <div class="card">
                <img src="${notebook.img}" class="card-img-top" alt="${notebook.nombre}">
                <div class="card-body pt-0">
                    <h5 class="card-title">${notebook.nombre}</h5>
                    <p class="card-text my-1">Marca: ${notebook.marca}</p>
                    <p class="card-text my-1">Precio: ${notebook.precio.toLocaleString("es-CL", {style: "currency", currency: "CLP"})}</p>
                    <button class="btn btn-primary btnAgregar" data-id="${notebook.id}">Agregar al carrito</button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });

    agregarAlCarrito(); // Se llama a la funcion para agregar notebooks al carrito despues de renderizar
    
}



// Funcion para agregar los notebooks al carrito
function agregarAlCarrito() {
    const agregarBtns = document.querySelectorAll(".btnAgregar");

    agregarBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const notebookId = e.currentTarget.getAttribute('data-id');
            const selectedNotebook = notebooks.find(notebook => notebook.id == notebookId);

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(selectedNotebook);
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Mostrar la alerta de "Añadido con exito"
            Swal.fire({
                icon: 'success',
                title: '¡Añadido!',
                text: 'El notebook se ha añadido al carrito',
                showConfirmButton: false,
                timer: 1000
            });

            // Agregar la clase de alerta al icono del carrito solo si el carrito no está vacio
            if (carrito.length > 0) {
                carritoNavItem.classList.add('alert-icon');
            }

            // Remover la clase si el carrito esta vacio
            if (carrito.length === 0) {
                carritoNavItem.classList.remove('alert-icon');
            }
        });
    });
}

agregarAlCarrito();












