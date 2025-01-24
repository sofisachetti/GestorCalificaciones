# Gestor de Estudiantes y Notas

Este proyecto es una API Rest desarrollada con JavaScript para la de gestión de estudiantes que permite, por un lado, a lxs profesores registrar, buscar, actualizar información, agregar notas y eliminar estudiantes, y por otro lado, a lxs estudiantes ver sus calificaciones.

## Tecnologías usadas:

- **Node.js**
- **Express.js**
- **bcrypt**: Para el cifrado de contraseñas.
- **jsonwebtoken**: Para generar y verificar tokens de autenticación.
- **cors**: Para habilitar el intercambio entre dominios.
- **body-parser**: Para el manejo de datos JSON en las solicitudes.
- **dotenv**
- **zod**

---

## Estructura del Proyecto

### 1. `index.js`

Es el punto de entrada del servidor. Acá se incorporaron:

- **Middlewares**.
- **Rutas principales**: Se configuró el router definido en `studentsRoutes.js` para manejar las solicitudes hacia `/students`.
- **Servidor**: Se definió escuchando en el puerto 3000.

---

### 2. Controladores (`studentsController.js`)

Se definieron las funciones para manejar las solicitudes relacionadas con estudiantes y usuarios:

- **Obtener estudiantes (********`getStudents`********)**: Retorna todxs lxs estudiantes con su respectiva información. Permite que profesores y estudiantes vean la información pública de los estudiantes.
- **Añadir estudiante (********`addStudent`********)**: Toma los datos de la solicitud, los guarda en la base de datos (`studentsData.json`) y devuelve un mensaje de éxito si se completaron los datos correctamente.
- **Buscar estudiante por ID (********`getStudentById`********)**: Busca unx estudiante en la base de datos usando su ID y muestra su ficha.
- **Actualizar estudiante (********`updateStudent`********)**: Actualiza estudiantes, modificando sus datos con los enviados en el cuerpo de la solicitud y guarda los cambios en `studentsData.json`.
- **Eliminar estudiante (********`deleteStudent`********)**: Elimina estudiantes desde su ID.
- **Registrar usuario (********`registerStudent`********)**: Registra un nuevo usuario (profesor o estudiante).
- **Logear usuario (********`loginUser`********)**: Permite iniciar sesión.

---

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/sofisachetti/GestorCalificaciones.git
   ```
2. Instalar las dependencias:
   ```bash
   npm install express bcrypt zod dotenv body-parser cors
   ```
3. Ejecutar el servidor:
   ```bash
   node index.js
   ```

---

## Uso del Sistema

### Profesores

- **Registran estudiantes**.
- **Actualizan información.**
- **Eliminan estudiantes por ID**.
- **Buscan estudiantes por ID**

### Estudiantes

- **Visualizan calificaciones**.

---

## "Base de datos"

Los datos de estudiantes y usuarios se manejan en archivos JSON locales: `studentsData.json` y `usersData.json`.

---

## Frontend
Utilizamos la librería Boostrap.

Cuenta con:
- **Espacio para registrarse.**
- **Espacio para iniciar sesión.**

### **5 botones:**
- **Ver Estudiantes**: Despliega las fichas de todos los estudiantes.
- **Buscar estudiante por ID**: Despliaga un cuadro de texto para ingresar el ID y un botón de búsqueda.
- **Editar estudiante**: Despliega cuadros de texto para ingresar los nuevos datos.
- **Eliminar estudiante**: Despliaga un cuadro de texto para ingresar el ID del usuario que se quiere eliminar.
- **Añadir estudiante**: Despliega cuadros de texto para ingresar los datos del nuevo estudiante.
