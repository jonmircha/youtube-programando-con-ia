# Gestor de Tareas (My ToDos) con Supabase

Necesito crear una aplicación web con HTML, CSS y JavaScript Vanilla, sin frameworks, ni librerías, ni dependencias npm y como backend use Supabase.

La aplicación debe permitir al usuario logueado crear, editar, listar, marcar/desmarcar y eliminar tareas por el usuario.

## Reglas de Negocio:

- Proponme un modelo relacional de la base de datos y el código SQL para crear la base de datos de la aplicación en el editor SQL de Supabase.
- Registro e inicio de sesión para los siguientes métodos de autenticación de Supabase:
  - Correo y contraseña.
  - Cuenta de Google.
- Al momento de crear un usuario en el servicio de autenticación de Supabase, debe crearse un registro en la tabla de usuarios de la base de datos.
- CRUD de tareas personales, siempre y cuando el usuario este logueado en el servicio de autenticación de Supabase.
- La interfaz visual deberá permitir filtrar las tareas por hacer de las hechas, enviando las tareas hechas al final de la lista y dejando las que siguen por hacer al principio.
- Cerrar Sesión de la aplicación.
- El diseño de la UI que sea estético y minimalista.
- Proporcioname las reglas de seguridad para ejecutar la aplicación en producción.
- La aplicación debe ser multipage, es decir en diferentes archivos HTML dependiendo de las funcionalidades, por ejemplo home, iniciar sesión, registro, etc.
- El código JS y CSS debe estar modularizado.

A parte de proporcionarme el código necesario para construir la aplicación, proporcioname todas las instrucciones necesarias y los pasos a seguir para ir ejecutando el código y dar de alta los servicios en Supabase.

## Conversación con _Chat GPT_

[🤓🤖👉🏻 Click aquí](https://chatgpt.com/share/6801ee8e-ab94-8007-8b26-5c99f8776561)

## Nota

> Recuerda reemplazar las credenciales de tu proyecto de _Supabase_ en el archivo `supabase.js`:

```js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://YOUR_PROJECT.supabase.co",
  "YOUR_PUBLIC_ANON_KEY"
);
```
