async function login() {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  const resp = await fetch("/api/auth/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      usuario: usuario,
      clave: clave,
    }),
  });

  const data = await resp.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("nombre_usuario", data.usuario.nombre);
    window.location.href = "/principal.html";
  } else {
    const mensaje = document.getElementById("mensajeError");

    mensaje.classList.remove("d-none");
  }
}
