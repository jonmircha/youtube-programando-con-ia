import { auth, db } from "../firebase.js";

const form = document.getElementById("register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;

  try {
    // Crear el usuario con Firebase Authentication
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    const user = cred.user;

    // Crear documento del usuario en Realtime Database
    await db.ref("users/" + user.uid).set({
      email: user.email,
      created_at: new Date().toISOString(),
    });

    // Redirigir al home
    window.location.href = "index.html";
  } catch (error) {
    alert("Error al registrar: " + error.message);
  }
});
