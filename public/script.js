const PORT = 3000;

///////////////////// Script para metodo GET ALL STUDENTS
//Aca lo q hace es decirte que cuando haga click en el elemtno con el id allStudentID(ver en html) va a hacer la peticion a la url del back que figura en el fetch. La peticion viaja al back, entra en la ruta /students, pasa al controler.. de ahi pasa al model, hace la logica del model y nos devuelve el json con todos los estudiantes(eso es lo q nos manda el back). ese json de estudiantes entra de nuevo aca al script y se trata como DATA. Por cada estudiante (forEach) de la lista, se va a imprimir en el html una tarjetita con los datos (card). Ese modelo de card lo saque de la libreria boostrap, y despues si le hice modificaciones de tamaños colores etc con el css para q quede bien.
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

///////////////////// Script para metodo GET STUDENTS BY ID

//En este caso, primero hice un formulario donde le pvamos a pedir al usuario q ponga el id que quiere buscar. Ese formulario esta en el html, pero si ven dentro de la etiqueta del formulario html van a ver que dice, style.display = none, que quiere decir que esa parte va a estar oculta en el html principal. Aca, en el script yo le digo que:
//Cuando haga click en el elemento studentById, me despliegue ese formulario que estaba oculto, cambiandole su style.display a BLOCK que es visible.
//Despues tb le digo que oculte el formulario al clicar el boton de cancelar y de buscar.
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
//Tomamos el valor que el usuario coloco en el input(id buscado), lo guardo en una const y lo pongo en la URL del fetch, ahi hago la peticion al back, hace todo el proceso anterior y esta vez lo q retorna es un solo estudiante, que lo vamos a renderizar en el html en el elemento con el id studentByIdContainer(ver en html). 
document.getElementById("studentForm1").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("idStudentById").value;

    fetch(`http://localhost:3000/students/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

        .then(response => response.json())
        .then(data => {
            if (data.name === undefined) {
                alert('Estudiante no encontrado')
            } else {
                console.log(data);
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



////////////////// Script para metodo PUT-UPDATE STUDENT
document.getElementById("editStudentByIdbtn").addEventListener("click", function () {
    document.getElementById("editStudentByIdForm").style.display = "block";
});

// Ocultar el formulario si se hace clic en "Cancelar"
document.getElementById("cancelBtn4").addEventListener("click", function () {
    document.getElementById("editStudentByIdForm").style.display = "none";
});

// Ocultar el formulario si se hace clic en "Añadir"
document.getElementById("btnEdit").addEventListener("click", function () {
    document.getElementById("editStudentByIdForm").style.display = "none";
});

document.getElementById("editStudentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("idEdit").value;
    const name = document.getElementById("nameEdit").value;
    const course = document.getElementById("courseEdit").value;
    const role = document.getElementById("roleEdit").value;
    const notes = document.getElementById("notesEdit").value;

    let studentData = {
        name: name,
        course: course,
        role: role,
        notes: notes.split(" ")  // formato que debe escribirse este campo["modulo2=7","modulo3=10"]
    };
    let studentDataJson = JSON.stringify(studentData);


    fetch(`http://localhost:3000/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: studentDataJson
    })
        .then(response => response.json())
        .then(data => {
            if(data.id === undefined || !data){
                alert('Error al actualizar estudiante. Verificar LOGIN.')
            }else{
            alert('Estudiante actualizad con exito.')
            console.log(data);
            document.getElementById("editStudentByIdForm").style.display = "none";
        }})
        .catch.error(error => {
            console.log('Error: ', error);
            alert('Error al actualizar el estudiante.')
        })

});


///////////////// Script para metodo DELETE-ELIMINAR STUDENT

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

document.getElementById("eliminateStudentByIdForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("idDelete").value;

    fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.id === undefined) {
                alert("Error al eliminar estudiante. Verificar LOGIN.")
            } else {
                console.log(data);
                alert("El estudiante ha sido eliminado exitosamente");
                document.getElementById("eliminateStudentByIdForm").style.display = "none";
            }
        })
        .catch(error => {
            console.log('Error: ', error);
            alert("Error al eliminar el estudiante");
        });
});


////////// Script para metodo POST-ADD STUDENT

//En este caso hacemos un formulario tmb que va a estar escondido hasta q se haca click en el boton de AÑADIR ESTUDIANTE y hacemos lo mismo que en el metodo get by id, tomamos los valores de los campos input del formulario, los guardamos en constantes, armamos un obj studenteData, lo hacemos json, y hacemos el fetch, solo que en este caso vamos a mandar el cuerpo o body de la peticion(porque es un post) donde vamos a mandar el json del nuevo estud. Y ahi listo.. se agrega (le puse un alert para q avuse si se agrego exitosamente o no).
document.getElementById("addStudentbtnn").addEventListener("click", function () {
    document.getElementById("addStudentForm").style.display = "block";
});

document.getElementById("cancelBtn6").addEventListener("click", function () {
    document.getElementById("addStudentForm").style.display = "none";
});


// Manejar la acción de envío del formulario
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    // Obtener los datos del formulario para crear un objeto para enviar en POST
    const name = document.getElementById("addName").value;
    const course = document.getElementById("addCourse").value;
    const role = document.getElementById("addRole").value;
    const notes = document.getElementById("addNotes").value;

    let studentData = {
        name: name,
        course: course,
        role: role,
        notes: notes
    }
    let studenDataJson = JSON.stringify(studentData);

    fetch('http://localhost:3000/students', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },
        body: studenDataJson,
    })
        .then(response => response.json)
        .then(data => {
            if(data.id === undefined || !data ){
                alert('Error al añadir estudiante. Verificar LOGIN.')
                document.getElementById("addStudentForm").style.display = "none";
            }else{
                alert('Estudiante añadido con exito.')
                console.log(data.name);
                document.getElementById("addStudentForm").style.display = "none";
            }
        })
        .catch.error(error => {
            console.log('Error: ', error);
            alert('Error al añadir estudiante.')
        });
});


//////////////////// Script para formulario de Registro
document.getElementById("registerForm").addEventListener("submit", function (e){
    e.preventDefault();
    const email =document.getElementById("emailRegister").value;
    const password = document.getElementById("passwordRegister").value;

    fetch("http://localhost:3000/students/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(response => response.json)
    .then(data => {
if(data === "Registro del usuario con éxito "){
    alert("Usuario registrado con exito!")
}else{
    alert("Error al registrar usuario.")
}
    })
    .catch(error => {
        console.log("Error de registro-catch script", error);
alert("Hubo un error al registrar el usuario, intente nuevamente.")
    });
});