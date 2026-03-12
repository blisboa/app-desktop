function obtenerNombreModulo() {
  const params = new URLSearchParams(window.location.search);

  const nombre = params.get("menu");

  const titulo = document.getElementById("tituloModulo");

  if (nombre) {
    titulo.innerText = nombre;
  } else {
    titulo.innerText = "Módulo";
  }
}

obtenerNombreModulo();
