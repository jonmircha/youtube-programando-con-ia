import { auth } from "../firebase.js";

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => (window.location.href = "index.html"))
    .catch((err) => alert(err.message));
});

document.getElementById("google-login").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then(() => (window.location.href = "index.html"))
    .catch((err) => alert(err.message));
});
