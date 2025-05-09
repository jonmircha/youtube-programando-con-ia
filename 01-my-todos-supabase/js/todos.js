import { supabase } from "./supabase.js";

const logoutBtn = document.getElementById("logout-btn");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const emptyMsg = document.getElementById("empty-msg");

let user = null;
let todos = [];

document.addEventListener("DOMContentLoaded", async () => {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData.session) {
    window.location.href = "login.html";
    return;
  }

  user = sessionData.session.user;

  await loadTodos();
});

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "login.html";
});

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = todoInput.value.trim();
  if (!title) return;

  const { data, error } = await supabase.from("todos").insert([
    {
      user_id: user.id,
      title,
      completed: false,
    },
  ]);

  if (!error) {
    todoInput.value = "";
    await loadTodos();
  } else {
    alert("Error al crear tarea: " + error.message);
  }
});

async function loadTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("completed", { ascending: true }) // pendientes arriba
    .order("created_at", { ascending: true });

  if (!error) {
    todos = data;
    renderTodos();
  } else {
    alert("Error al cargar tareas: " + error.message);
  }
}

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", async () => {
      await supabase
        .from("todos")
        .update({
          completed: checkbox.checked,
          updated_at: new Date().toISOString(),
        })
        .eq("id", todo.id);
      await loadTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.title;
    if (todo.completed) span.classList.add("completed");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
      const newTitle = prompt("Editar tarea:", todo.title);
      if (newTitle && newTitle.trim() !== "") {
        supabase
          .from("todos")
          .update({
            title: newTitle.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", todo.id)
          .then(loadTodos);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      if (confirm("¿Eliminar esta tarea?")) {
        supabase.from("todos").delete().eq("id", todo.id).then(loadTodos);
      }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}
