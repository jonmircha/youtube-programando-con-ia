# Gestor de Tareas (My ToDos) con Firebase

Necesito crear una aplicación web con HTML, CSS y JavaScript Vanilla, sin frameworks ni librerías, ni dependencias npm y como backend use Firebase.

La aplicación debe permitir al usuario logueado crear, editar, listar, marcar/desmarcar y eliminar tareas por el usuario.

## Reglas de Negocio:

- Proponme un modelo documental de la base de datos y el código JSON para importar el equema de la base de datos en el Servicio de Realtime Database de Firebase.
- Registro e inicio de sesión para los siguientes métodos de autenticación de Firebase:
  - Correo y contraseña.
  - Cuenta de Google.
- Al momento de crear un usuario en el servicio de autenticación de Firebase, debe crearse un documento en la colección de usuarios de la base de datos.
- CRUD de tareas personales, siempre y cuando el usuario este logueado en el servicio de autenticación de Firebase.
- La interfaz visual deberá permitir filtrar las tareas por hacer de las hechas, enviando las tareas hechas al final de la lista y dejando las que siguen por hacer al principio.
- Cerrar Sesión de la aplicación.
- El diseño de la UI que sea estético y minimalista.
- Proporcioname las reglas de seguridad de la base de datos para ejecutar la aplicación en producción.
- La aplicación debe ser multipage, es decir en diferentes archivos HTML dependiendo de las funcionalidades, por ejemplo home, iniciar sesión, registro, etc.
- El código JS y CSS debe estar modularizado.

A parte de proporcionarme el código necesario para construir la aplicación, proporcioname todas las instrucciones necesarias y los pasos a seguir para ir ejecutando el código y dar de alta los servicios en Firebase.

## Conversación con _Chat GPT_

[🤓🤖👉🏻 Click aquí](https://chatgpt.com/share/6805e8c7-088c-8007-a75a-bcc1dbcacbe5)

## Nota

> Recuerda reemplazar las credenciales de tu proyecto de _Firebase_ en el archivo `firebase.js`:

```js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  databaseURL: "https://TU_DOMINIO.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_DOMINIO.appspot.com",
  messagingSenderId: "XXX",
  appId: "APP_ID",
};
```
