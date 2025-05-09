import { supabase } from "./supabase.js";

const registerForm = document.getElementById("register-form");
const message = document.getElementById("message");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      message.textContent = signUpError.message;
      return;
    }

    // Esperamos a obtener la sesión activa
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      message.style.color = "green";
      message.textContent = "¡Cuenta creada! Verifica tu correo electrónico.";
      return;
    }

    const userId = sessionData.session.user.id;

    // Insertamos el usuario en la tabla "users"
    const { error: dbError } = await supabase
      .from("users")
      .insert([{ id: userId, email }]);

    if (dbError) {
      console.error("Error al insertar en la tabla users:", dbError.message);
    }

    message.style.color = "green";
    message.textContent = "¡Cuenta creada exitosamente!";
    registerForm.reset();
  });
}

const loginForm = document.getElementById("login-form");
const googleLoginBtn = document.getElementById("google-login");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      message.textContent = error.message;
    } else {
      window.location.href = "index.html";
    }
  });
}

const githubLoginBtn = document.getElementById("github-login");

if (githubLoginBtn) {
  githubLoginBtn.addEventListener("click", async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/01-my-todos-supabase/auth.html`,
      },
    });

    if (error) {
      message.textContent = error.message;
    }
  });
}

// Mostrar errores que vengan como parámetro en la URL
const params = new URLSearchParams(window.location.search);
const authError = params.get("error");

if (authError) {
  message.textContent = decodeURIComponent(authError);
  message.style.color = "red";
}
