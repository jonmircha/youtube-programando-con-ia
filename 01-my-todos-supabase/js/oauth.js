import { supabase } from "./supabase.js";

(async () => {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData.session) {
    const errorMsg = encodeURIComponent(
      sessionError?.message || "Sesión no encontrada"
    );
    window.location.href = `login.html?error=${errorMsg}`;
    return;
  }

  const { user } = sessionData.session;
  const { id, email } = user;

  // Verificar si ya existe en la tabla "users"
  const { data: existingUser, error: userCheckError } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (userCheckError && userCheckError.code !== "PGRST116") {
    const errorMsg = encodeURIComponent(userCheckError.message);
    window.location.href = `login.html?error=${errorMsg}`;
    return;
  }

  if (!existingUser) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ id, email }]);

    if (insertError) {
      const errorMsg = encodeURIComponent(insertError.message);
      window.location.href = `login.html?error=${errorMsg}`;
      return;
    }
  }

  // Todo bien, redirigir a la página principal
  window.location.href = "index.html";
})();
