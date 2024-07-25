// Traer header y añadir clases
let header = document.getElementById("header");
header.classList.add('d-flex', 'flex-column', 'flex-md-row', 'bg-primary', 'justify-content-center', 'align-items-center');



//////////////////////////// Creación del logo ////////////////////////////
//////////////////////////// Creación del logo ////////////////////////////

// Cargar logo en header
let logo = document.getElementById("logo-header");
logo.classList.add('w-50', 'd-flex', 'justify-content-center', 'justify-content-md-start', 'p-3');

// Crear link del logo 
let link = document.createElement('a');
link.href = './index.html';
link.classList.add('d-flex', 'align-items-center', 'w-100');

// Crear imagen del logo 
let img = document.createElement('img');
img.src = './imgs/logo-lapstore.svg';  
img.classList.add('img-fluid', 'w-100');

// Adjuntar la imagen al link y el link al logo :S
link.appendChild(img);
logo.appendChild(link);



//////////////////////////// Creación del input de búsqueda ////////////////////////////
//////////////////////////// Creación del input de búsqueda ////////////////////////////


// Crear elementos del input y el boton de busqueda
let input = document.createElement('input');
input.classList.add('form-control', 'me-2');
input.setAttribute('type', 'search');
input.setAttribute('placeholder', 'Busca tu marca favorita:  Asus, hp, Lenovo o Samsung');
input.setAttribute('aria-label', 'Buscar');

// Botón de busqueda
let button = document.createElement('button');
button.classList.add('btn', 'btn-outline-warning', 'btn-search');
button.setAttribute('type', 'button');
button.textContent = '🔍';

// Obtener el formulario donde se insertará el input y el botón
let form = document.getElementById('searchBar');
form.appendChild(input);
form.appendChild(button);





/////////////////////////// NO DEBI HABER HECHO LA NAVEGACION ASI //////////////////



//////////////////////////// Creación del NavBar ////////////////////////////
//////////////////////////// Creación del NavBar ////////////////////////////

let nav = document.createElement('nav');
nav.classList.add('navbar', 'navbar-expand-sm', 'navbar-dark', 'bg-primary');

let containerFluid = document.createElement('div');
containerFluid.classList.add('container-fluid');

// Botón de hamburguesa toggle para responsive
let navbarToggler = document.createElement('button');
navbarToggler.classList.add('navbar-toggler');
navbarToggler.type = 'button';
navbarToggler.setAttribute('data-bs-toggle', 'collapse');
navbarToggler.setAttribute('data-bs-target', '#navbarNav');
navbarToggler.setAttribute('aria-controls', 'navbarNav');
navbarToggler.setAttribute('aria-expanded', 'false');
navbarToggler.setAttribute('aria-label', 'Toggle navigation');

let navbarTogglerIcon = document.createElement('span');
navbarTogglerIcon.classList.add('navbar-toggler-icon');
navbarToggler.appendChild(navbarTogglerIcon);

// Div para contener los elementos colapsables
let navbarCollapse = document.createElement('div');
navbarCollapse.classList.add('collapse', 'navbar-collapse');
navbarCollapse.setAttribute('id', 'navbarNav');

let ul = document.createElement('ul');
ul.classList.add('navbar-nav');


// Crear los elementos de los items del navbar (Home y Carrito)
//// Botón Home
let homeNavItem = document.createElement('li');
homeNavItem.classList.add('nav-item', 'align-content-center');

let homeLink = document.createElement('a');
homeLink.classList.add('nav-link');
homeLink.href = 'index.html';
homeLink.textContent = 'Tienda';

// Crear y configurar la imagen del icono del home
let imgHome = document.createElement('img');
imgHome.src = './imgs/home.svg';
imgHome.classList.add('carrito-icon', 'p-1');

// Insertar la imagen al lado del texto "Home"
homeLink.insertBefore(imgHome, homeLink.firstChild);

// Agregar el botón Home al navbar
homeNavItem.appendChild(homeLink);
ul.appendChild(homeNavItem);



//// Botón Carrito
let carritoNavItem = document.createElement('li');
carritoNavItem.classList.add('nav-item');

let carritoLink = document.createElement('a');
carritoLink.classList.add('nav-link');
carritoLink.href = 'carrito.html';
carritoLink.textContent = 'Carrito';


// Crear y configurar la imagen del icono del carrito
let imgCarrito = document.createElement('img');
imgCarrito.src = './imgs/carrito.svg';
imgCarrito.classList.add('carrito-icon', 'p-1');

// Insertar la imagen al lado del texto "Carrito"
carritoLink.insertBefore(imgCarrito, carritoLink.firstChild);

// Agregar el enlace al botón Carrito
carritoNavItem.appendChild(carritoLink);

// Agregar el botón Carrito al navbar
ul.appendChild(carritoNavItem);





// Estructurar el navbar
navbarCollapse.appendChild(ul);
containerFluid.appendChild(navbarToggler);
containerFluid.appendChild(navbarCollapse);
nav.appendChild(containerFluid);

// Traer el contenedor donde se va a insertar el navbar en el DOM
let navbarContainer = document.getElementById('navbar-container');
navbarContainer.appendChild(nav);




//////////////////////////// Función de búsqueda y filtrado ///////////////////////////
//////////////////////////// Función de búsqueda y filtrado ///////////////////////////

// Event listener para el botón de búsqueda y también para la tecla Enter
button.addEventListener('click', filterNotebooks);
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar que se envíe el formulario
        filterNotebooks();
    }
});


// Funcion para filtrar notebooks
function filterNotebooks() {
    let marca = input.value.trim().toLowerCase();

    // Obtengo todos los contenedores de las tarjetas de notebooks
    let cardContainers = document.querySelectorAll('.col-lg-3');
    let found = false;

    cardContainers.forEach(container => {
        let cardMarca = container.getAttribute('data-marca').toLowerCase();

        if (cardMarca.includes(marca) || marca === '') {
            container.style.display = 'block'; // Mostrar el contenedor si coincide con la marca o no hay filtro
            found = true;
        } else {
            container.style.display = 'none'; // Ocultar el contenedor si no coincide con la marca
        }
    });

    // Si no se encontraron resultados, mostrar alerta 
    if (!found) {
        Swal.fire({
            icon: 'warning',
            title: 'Marca no encontrada',
            text: 'Esa marca no existe, prueba con Asus, HP, Samsung, Acer o Lenovo',
        });
    }
}



