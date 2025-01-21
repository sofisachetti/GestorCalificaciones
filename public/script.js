const PORT = 3000;

// document.addEventListener("DOMContentLoaded", () => {
//     // Variables de los formularios y botones
//     const registerForm = document.getElementById('registerForm');
//     const loginForm = document.getElementById('loginForm');
//     const cancelButtons = document.querySelectorAll('#cancelBtn');
//     const addStudentButton = document.getElementById('addStudentbtnn');
    
//     // Función para mostrar una alerta simple (puedes modificarla para hacer algo más complejo)
//     function showAlert(message, isError = false) {
//         const alert = document.createElement('div');
//         alert.classList.add('alert');
//         alert.classList.add(isError ? 'alert-danger' : 'alert-success');
//         alert.textContent = message;
//         document.body.appendChild(alert);
//         setTimeout(() => {
//             alert.remove();
//         }, 3000);
//     }

//     // Evento para el formulario de registro
//     registerForm.addEventListener("submit", (event) => {
//         event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;

//         // Validación simple
//         if (email === "" || password === "") {
//             showAlert("Por favor, complete todos los campos.", true);
//             return;
//         }

//         showAlert("Registro exitoso.");
//         registerForm.reset(); // Resetea los campos del formulario
//     });

//     // Evento para el formulario de inicio de sesión
//     loginForm.addEventListener("submit", (event) => {
//         event.preventDefault(); // Evita el envío tradicional

//         const email = document.getElementById("usuario").value;
//         const password = document.getElementById("password").value;

//         // Validación simple
//         if (email === "" || password === "") {
//             showAlert("Por favor, complete todos los campos.", true);
//             return;
//         }

//         showAlert("Inicio de sesión exitoso.");
//         loginForm.reset(); // Resetea los campos del formulario
//     });

//     // Evento para los botones de cancelar en los formularios
//     cancelButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             // Limpia los formularios al cancelar
//             registerForm.reset();
//             loginForm.reset();
//         });
//     });

//     // Evento para el botón de añadir estudiante
//     addStudentButton.addEventListener("click", () => {
//         showAlert("Función para añadir estudiante aún no implementada.");
//     });

//     // Aquí puedes agregar más funcionalidad según lo que necesites, como los botones para ver estudiantes, editar, eliminar, etc.
// });


///////////////////////////
document.getElementById("allStudentsbtn").addEventListener("click", function () {
    fetch(`http://localhost:3000/students`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            data.forEach(student => {
                html += `<div class="col-md-4 cardTodas">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre: ${student.name}</h5>
                                    <p class="card-text">Rol:${student.role}</p>
                                    <p class="card-text">Curso: ${student.course}</p>
                                    <p class="card-text">Calificaciones: ${student.notes}</p>
                                </div>
                            </div>
                        </div>`;
            });
            document.getElementById("allStudentsContainer").innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
