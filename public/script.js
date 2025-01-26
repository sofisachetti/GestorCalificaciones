const PORT = 3000;


// Script para metodo GET ALL STUDENTS - ES DE ACCESO LIBRE

// Se hace la petición con fetch a la url del back para obtener todos los alumnos
document.getElementById("allStudentsbtn").addEventListener("click", function () {
    fetch(`http://localhost:3000/students`)
        .then(response => response.json())
        // La info que devuelve el controlador (lista de alumnos) llega como 'data'
        .then(data => { 
            console.log(data);
            let html = "";
            // Por cada estudiante de la lista se va a imprimir en el html una card con los datos de cada alumno.
            // Modelos de card sacados de librería boostrap
            data.forEach(student => { 
                html += `<div class="col-md-4 cardTodas">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre: ${student.name}</h5>
                                    <p class="card-text">ID: ${student.id}</p>
                                    <p class="card-text">Rol:${student.role}</p>
                                    <p class="card-text">Curso: ${student.course}</p>
                                    <p class="card-text">Calificaciones: ${student.notes}</p>
                                </div>
                            </div>
                        </div>`;
            });
            document.getElementById("studentByIdContainer").innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


// Script para metodo GET STUDENTS BY ID - ES DE ACCESO LIBRE

// Formulario donde pedimos al usuario el id que quiere buscar.
// style.display = none quiere decir que esa parte va a estar oculta en el html principal.
// Cuando haga click en el elemento studentById, despliega el formulario oculto, cambiandole su style.display a BLOCK que es visible.
document.getElementById("studentByIdbtn").addEventListener("click", function () {
    document.getElementById("studentByIdForm").style.display = "block";
})

// Ocultar el formulario si se hace clic en "Cancelar"
document.getElementById("cancelBtn3").addEventListener("click", function () {
    document.getElementById("studentByIdForm").style.display = "none";
});

// Ocultar el formulario si se hace clic en "Añadir"
document.getElementById("btnBuscar").addEventListener("click", function () {
    document.getElementById("addStudentForm").style.display = "none";
});

// Manejar la acción de envío del formulario
document.getElementById("studentForm1").addEventListener("submit", function (e) {
    e.preventDefault();
    // Se toma el valor que el usuario pone en el input (id del alumno buscado) y se guarda en una constante
    const id = document.getElementById("idStudentById").value;
    // El id se pasa como el parametro al endpoint de peticion al back
    fetch(`http://localhost:3000/students/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            // Info del estudiante que retorna lo renderiza en el html
            // Si no encontró ningun alumno sale un alerta. 
            if (data.name === undefined) {
                alert('Estudiante no encontrado')
            } else {
                let html = `<div class="col-md-4 cardTodas">
                            <div class="card-getById">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre: ${data.name}</h5>
                                    <p class="card-text">ID: ${data.id}</p>
                                    <p class="card-text">Rol:${data.role}</p>
                                    <p class="card-text">Curso: ${data.course}</p>
                                    <p class="card-text">Calificaciones: ${data.notes}</p>
                                </div>
                                </div>
                            </div>`;
                    document.getElementById("studentByIdContainer").innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



// Script para metodo PUT - UPDATE STUDENT (RUTA PROTEGIDA)

document.getElementById("editStudentByIdbtn").addEventListener("click", function () {
    document.getElementById("editStudentByIdForm").style.display = "block";
});

// Ocultar el formulario si se hace clic en "Cancelar"
document.getElementById("cancelBtn4").addEventListener("click", function () {
    document.getElementById("editStudentByIdForm").style.display = "none";
});

// Ocultar el formulario si se hace clic en "Añadir"
document.getElementById("btnEdit").addEventListener("click", function () {
    document.getElementById("editStudentByIdForm").style.display = "block";
});

// Manejar la accion de envio del formulario
document.getElementById("editStudentForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Se extraen los valores del input y se los guarda en constantes
    const id = document.getElementById("idEdit").value;
    const name = document.getElementById("nameEdit").value;
    const course = document.getElementById("courseEdit").value;
    const role = document.getElementById("roleEdit").value;
    let notes = document.getElementById("notesEdit").value;

    // Pasamos las data de notas que entra como string a un array de notas
    const arrayNotes = notes.split(' ')
    notes = arrayNotes.map(nota => parseInt(nota))

    try {
        // Obtener datos actuales del estudiante
        const response = await fetch(`http://localhost:3000/students/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": window.sessionStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const currentData = await response.json()

        // Combinar los datos actuales con los que actualizamos
        const updatedData = {
            ...currentData,
            ...(name && { name }),
            ...(course && { course }),
            ...(role && { role }),
            ...(notes && { notes }),
        };

        // Envia datos combinados al back
        const updateResponse = await fetch(`http://localhost:3000/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authorization": window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(updatedData)
        });

        if (!updateResponse.ok) {
            throw new Error(`Error al actualizar estudiante: ${updateResponse.status}`);
        }

        const result = await updateResponse.json();
        alert('Estudiante actualizado con exito.')
        document.getElementById("editStudentByIdForm").style.display = "none";
    } catch (error) {
        console.error('Error al editar estudiante: ', error);
        alert('Error al actualizar el estudiante.');
    }
});


// Script para metodo DELETE - ELIMINAR STUDENT (RUTA PROTEGIDA)

document.getElementById("eliminateStudentbtnn").addEventListener("click", function () {
    document.getElementById("eliminateStudentByIdForm").style.display = "block";
});

// Ocultar el formulario si se hace clic en "Cancelar"
document.getElementById("cancelBtn5").addEventListener("click", function () {
    document.getElementById("eliminateStudentByIdForm").style.display = "none";
});

// Ocultar el formulario si se hace clic en "Eliminar"
document.getElementById("btnEliminar").addEventListener("click", function () {
    document.getElementById("eliminateStudentByIdForm").style.display = "none";
});

// Menejo de los datos de la solicitud
document.getElementById("eliminateStudentByIdForm").addEventListener("submit", function (e) {
    e.preventDefault();
    // Se extraen los valores del input y se lo guarda en una variable que se pasa como parametro a la url del fetch
    const id = document.getElementById("idDelete").value;

    fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // Al ser una solicitud protegida, utilizamos el token que queda almacenado en sessionStorage del navegador para validar al usuario que está realizando las solicitudes
            // El parametro 'token' se define con el metodo .setItem() que está en la solicitud de LOGIN
            "authorization": window.sessionStorage.getItem('token')
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            // Compara las respuestas que se reciben del controlador para trasmitir la respuesta al usuario a través de una alerta.
            if (data.message === "Estudiante eliminado") {
                alert("El estudiante ha sido eliminado exitosamente");
                document.getElementById("eliminateStudentByIdForm").style.display = "none";
            } else if (data.message === 'Error. El ID del estudiante no existe.') {
                alert("El ID del estudiante no existe.")
            }
        })
        .catch(error => {
            console.log('Error: ', error);
            alert("Error en el catch");
        });
});


// Script para metodo POST- ADD STUDENT (RUTA PROTEGIDA)

// Formulario que va a estar escondido hasta que se haca click en el boton de AÑADIR ESTUDIANTE
document.getElementById("addStudentbtnn").addEventListener("click", function () {
    document.getElementById("addStudentForm").style.display = "block";
});

document.getElementById("cancelBtn6").addEventListener("click", function () {
    document.getElementById("addStudentForm").style.display = "none";
});

// Manejar la acción de envío del formulario
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    // Obtener y guardar en contantes los datos del input para crear un objeto para enviar en POST
    const name = document.getElementById("addName").value;
    const course = document.getElementById("addCourse").value;
    const role = document.getElementById("addRole").value;
    const notes = document.getElementById("addNotes").value;

    // Pasamos los datos de 'notes' que entran como texto a un array de notas
    const arrayNotes = notes.split(' ')
    const newNotes = arrayNotes.map(nota => parseInt(nota))

    // Se arma un objeto representando toda la data del estudiante
    let studentData = {
        name: name,
        course: course,
        role: role,
        notes: newNotes
    }

    let studenDataJson = JSON.stringify(studentData);

    fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": window.sessionStorage.getItem('token')
        },
        body: studenDataJson // Se envia el objeto como el body del POST
    })
        .then(response => response.json())
        .then(data => {
            if (!data){ // Si la data no está disponible o está incompleta se envía un alerta
                alert('Error al añadir estudiante.')
                document.getElementById("addStudentForm").style.display = "none";
            } else { // Si los datos ingresan correctamente se crea el nuevo estudiante y se avisa con un alerta
                alert('Estudiante añadido con exito.')
                document.getElementById("addStudentForm").style.display = "none";
            }
        })
        .catch(error => {
            console.error('Error: ', error);
            alert('Error al añadir estudiante.')
        });
});


// Script para formulario de REGISTER

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Extremos y guardamos en constantes el email y contraseña ingresadas en los inputs
    const email = document.getElementById("emailRegister").value;
    const password = document.getElementById("passwordRegister").value;

    // Enviamos la solicitud de registro al back
    fetch("http://localhost:3000/students/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => { // Comparamos la respuesta qu retorna del controlador para enviar el alerta al usuario
        if (data.message === "Registro del usuario con éxito") {
            alert("Usuario registrado con exito!")
        } else {
            alert("El usuario ya existe.")
        } 
    })
    .catch(error => {
        console.log("Error de registro-catch script", error);
        alert("Hubo un error al registrar el usuario, intente nuevamente.")
    });
});

// Script para formulario de LOGIN
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Extremos y guardamos en constantes el email y contraseña ingresadas en los inputs
    const email = document.getElementById("usuarioLogin").value;
    const password = document.getElementById("passwordLogin").value;

    fetch("http://localhost:3000/students/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })

    .then(response => response.json())
    .then(data => {
        // Validaciones de token
        if(!data.token) {
            console.error('Token no proporcionado')
        }

        // Comprobacion de errores segun el mensaje que retorne del controlador
        if (data.message === 'Email no registrado.') {
            alert("Error. El email no está registrado o es incorrecto.")
        } else if (data.message === 'Contrasena incorrecta') {
            alert("Error. La contraseña es incorrecta.")
        } else { 
            // Si la solicitud es exitosa, toma el token que se envia del controlador. Con el metodo split() los dividimos para extraer el payload
            const partsToken = data.token.split('.')
            // El payload se guarda en una constante
            const payload = partsToken[1]
            // Esa constante se pasa al sessionStorage del navegador, que va a persistir mientras el navegador esté abierto
            // Una vez que el navgador se cierra, la informacion ahi reservada se elimina.
            // En las rutas protegidas se realiza un getItem() para validar los accesos.
            window.sessionStorage.setItem('token', payload)    
            alert("Inicio de sesión exitoso!")
        }
    })
    .catch(error => {
        console.error("Error de login-catch script", error);
        alert("Hubo un error al ingresar, intente nuevamente.")
    })
})