# Gestor de Estudiantes y Notas 📝

Este proyecto es una API Rest desarrollada con JavaScript para la de gestión de estudiantes que permite, por un lado, a lxs profesores registrar, buscar, actualizar información, agregar notas y eliminar estudiantes, y por otro lado, a lxs estudiantes ver sus calificaciones.

## Tecnologías utilizadas:

- **Node.js**
- **Express.js**
- **bcrypt**: Para el cifrado de contraseñas.
- **jsonwebtoken**: Para generar y verificar tokens de autenticación.
- **cors**: Para habilitar el intercambio entre dominios.
- **body-parser**: Para el manejo de datos JSON en las solicitudes.
- **dotenv**
- **Bootstrap**: Para el diseño de la interfaz.

---


## Estructura del Proyecto

### 1. `index.js`

Es el punto de entrada del servidor. Acá se se configura el proyecto y se define el puerto en donde correra el servidor.
- **Servidor**: Se definió escuchando en el puerto 3000.


### 2. `studentsRoutes.js`
- **Rutas principales**: Se configuró el router definido en `studentsRoutes.js` para manejar las solicitudes hacia `/students`. Se configuraron tambien rutas protegidas para las que se requiere autenticación y validación de datos.

---

### 3. Controladores y Medelos (`studentsController.js`y `studentsModel.js`)

Se definieron las funciones para manejar las solicitudes relacionadas con estudiantes y usuarios:

- **Obtener estudiantes (********`getStudents`********)**: Retorna todxs lxs estudiantes con su respectiva información. Permite que profesores y estudiantes vean la información pública de los estudiantes.
- **Añadir estudiante (********`addStudent`********)**: Toma los datos de la solicitud, los guarda en la base de datos (`studentsData.json`) y devuelve un mensaje de éxito si se completaron los datos correctamente. Esta función está disponible para los usuarios registrados (en este caso, serían lxs docentes). IMPORTANTE: El campo NOTAS debe tener los siguientes formatos: POSTMAN: `[1,2,3]` y NAVEGADOR: `1 2 3`.  
- **Buscar estudiante por ID (********`getStudentById`********)**: Busca unx estudiante en la base de datos usando su ID y muestra su ficha.
- **Actualizar estudiante (********`updateStudent`********)**: Actualiza estudiantes, modificando sus datos con los enviados en el cuerpo de la solicitud y guarda los cambios en `studentsData.json`. Esta función está disponible para los usuarios registrados.
IMPORTANTE: El campo NOTAS debe tener los siguientes formatos: POSTMAN: `[1,2,3]` y NAVEGADOR: `1 2 3`. 
- **Eliminar estudiante (********`deleteStudent`********)**: Elimina estudiantes desde su ID. Esta función está disponible para los usuarios registrados. 
- **Registrar usuario (********`registerUser`********)**: Registra un nuevo usuario (docente).
- **Logear usuario (********`loginUser`********)**: Permite iniciar sesión.


### 4. Middlewares (`authenticationToken.js` y `validateStudent.js`)

- **Middlewares**: Se configuraron dos middlewares para validar la autenticación y validar los datos ingresados en las rutas protegidas.
---

### 5. Data (`studentsData.json` y `usersData.json`)
Utilizamos dos archivos JSON que simulan ser una base de datos tanto para estudiantes como para usuarios registrados.

### 6. Public (`public/`)
Dentro de este directorio, se encuentran los archivos index.html y style.css que se utilizan para mostrar la interfaz de usuario, y por otro lado el archivo script.js que se encarga de conectar al frontend con el backend. Utilizamos la librería Boostrap para el diseño.



## Uso del Sistema

### Profesores

- **Registran estudiantes**.
- **Actualizan información.**
- **Eliminan estudiantes por ID**.
- **Buscan estudiantes por ID o la lista completa**

### Estudiantes

- **Buscan todos los estudiantes o buscan estudiantes por ID**
---

## Frontend

Cuenta con:
- **Espacio para registrarse.**
- **Espacio para iniciar sesión.**

### **5 botones:**
- **Ver Estudiantes**: Despliega las fichas de todos los estudiantes.
- **Buscar estudiante por ID**: Despliaga un cuadro de texto para ingresar el ID y un botón de búsqueda.
- **Editar estudiante**: Despliega cuadros de texto para ingresar los nuevos datos. IMPORTANTE: El campo NOTAS debe tener los siguientes formatos: POSTMAN: `[1,2,3]` y NAVEGADOR: `1 2 3`.
- **Eliminar estudiante**: Despliaga un cuadro de texto para ingresar el ID del usuario que se quiere eliminar.
- **Añadir estudiante**: Despliega cuadros de texto para ingresar los datos del nuevo estudiante. IMPORTANTE: El campo NOTAS debe tener los siguientes formatos: POSTMAN: `[1,2,3]` y NAVEGADOR: `1 2 3`.
