async function cargarMenus() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/index.html";
    return;
  }

  const resp = await fetch("/api/menu", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const menus = await resp.json();

  const ul = document.getElementById("menu");

  ul.innerHTML = "";

  menus.forEach((m) => {
    const li = document.createElement("li");
    li.className = "nav-item";

    const link = document.createElement("a");

    link.className = "nav-link";

    // enviamos el nombre del menú en la URL
    link.href = m.ruta + "?menu=" + encodeURIComponent(m.nombre);

    link.innerText = m.nombre;

    li.appendChild(link);

    ul.appendChild(li);
  });
}
const nombre_u = localStorage.getItem("nombre_usuario");
const nombre = document.getElementById("nombre_usuario");
if (nombre_u) {
  nombre.textContent = "Hola, " + nombre_u;
} else {
  nombre.textContent = "Usuario";
}

cargarMenus();

function logout() {
  // borra todoas las variables almacenadas en el local storage
  localStorage.clear();
  window.location.href = "/index.html";
}
