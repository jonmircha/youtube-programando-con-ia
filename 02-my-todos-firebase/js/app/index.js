import { auth, db } from "../firebase.js";

const logoutBtn = document.getElementById("logout-btn");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const filterRadios = document.querySelectorAll('input[name="filter"]');

let currentUser = null;
let tasks = [];

// 🔐 Verifica si el usuario está autenticado
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    cargarTareas();
  } else {
    window.location.href = "login.html";
  }
});

// 📤 Agregar nueva tarea
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm.title.value.trim();
  if (!title) return;

  const nuevaTarea = {
    title,
    completed: false,
    created_at: Date.now(),
  };

  await db.ref(`tasks/${currentUser.uid}`).push(nuevaTarea);
  taskForm.reset();
});

// 📥 Cargar y mostrar tareas
function cargarTareas() {
  db.ref(`tasks/${currentUser.uid}`).on("value", (snapshot) => {
    const data = snapshot.val() || {};
    tasks = Object.entries(data).map(([id, task]) => ({ id, ...task }));
    renderTareas();
  });
}

// 🎨 Renderizar tareas filtradas y ordenadas
function renderTareas() {
  taskList.innerHTML = "";

  const filtro = document.querySelector('input[name="filter"]:checked').value;
  const tareasFiltradas = tasks
    .filter(
      (t) =>
        filtro === "all" ||
        (filtro === "completed" && t.completed) ||
        (filtro === "active" && !t.completed)
    )
    .sort((a, b) => a.completed - b.completed || b.created_at - a.created_at);

  if (tareasFiltradas.length === 0) {
    taskList.innerHTML = "<li>No hay tareas.</li>";
    return;
  }

  tareasFiltradas.forEach((task) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="task-title" style="text-decoration:${
        task.completed ? "line-through" : "none"
      }; cursor:pointer;">
        ${task.title}
      </span>
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    `;

    li.querySelector(".task-title").addEventListener("click", () =>
      toggleCompletado(task.id, task.completed)
    );
    li.querySelector(".edit-btn").addEventListener("click", () =>
      editarTarea(task)
    );
    li.querySelector(".delete-btn").addEventListener("click", () =>
      eliminarTarea(task.id)
    );

    taskList.appendChild(li);
  });
}

// ✅ Marcar o desmarcar tarea como completada
function toggleCompletado(id, estadoActual) {
  db.ref(`tasks/${currentUser.uid}/${id}`).update({ completed: !estadoActual });
}

// ✏️ Editar el título de la tarea
function editarTarea(task) {
  const nuevoTitulo = prompt("Editar tarea:", task.title);
  if (nuevoTitulo && nuevoTitulo.trim() !== "") {
    db.ref(`tasks/${currentUser.uid}/${task.id}`).update({
      title: nuevoTitulo.trim(),
      updated_at: Date.now(),
    });
  }
}

// 🗑️ Eliminar tarea
function eliminarTarea(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar esta tarea?");
  if (confirmar) {
    db.ref(`tasks/${currentUser.uid}/${id}`).remove();
  }
}

// 🔓 Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});

// 🧼 Filtro por estado
filterRadios.forEach((radio) => {
  radio.addEventListener("change", renderTareas);
});
