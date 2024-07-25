document.addEventListener("DOMContentLoaded", () => {
    // Traer el contenedor del footer y agregar clases
    let footerContainer = document.getElementById("footerContainer");
    footerContainer.classList.add('d-flex', 'bg-dark', 'text-light', 'justify-content-center', 'align-items-center');

    // Crear formulario de contacto dentro del footer
    let formContainer = document.getElementById("footerForm");
    formContainer.classList.add('w-50', 'd-flex', 'justify-content-center', 'justify-content-md-start');

    formContainer.innerHTML = `
        <form id="contactForm" class="w-100">
            <h2 class="my-3">Contacto</h2>
            <div class="mb-3">
                <input type="email" placeholder="Escribe tu Email" class="form-control" id="email">
                <div id="emailHelp" class="form-text text-light">No compartiremos tus datos con nadie más</div>
            </div>
            <div class="mb-3">
                <input type="tel" placeholder="Tu teléfono" class="form-control" id="phone">
            </div>
            <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="Tus comentarios" id="comments" style="height: 100px"></textarea>
                <label for="comments">Tus comentarios</label>
            </div>
            <button type="submit" class="btn btn-primary mt-2 mb-5">Enviar</button>
        </form>
    `;

    // Agregar evento de validación al formulario
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const comments = document.getElementById("comments").value;

        let isValid = true;

        // Validación de email
        if (!validateEmail(email)) {
            Swal.fire("Por favor introduce un correo válido");
            isValid = false;
        }

        // Validación de teléfono (simple)
        if (!validatePhone(phone)) {
            Swal.fire("Por favor introduce un número válido");
            isValid = false;
        }

        // Validación de comentarios
        if (comments.trim(comments) === "") {
            Swal.fire("Por favor introduce tus comentarios");
            isValid = false;
        }

        if (isValid) {
            Swal.fire({
                title: "Envío exitoso",
                text: "Te estaremos contactando lo más pronto posible",
                icon: "success"
            });
            contactForm.reset();
        }
    });

    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Función para validar teléfono
    function validatePhone(phone) {
        const re = /^\d{7,}$/;
        return re.test(String(phone));
    }
});
