let instrumentos = [];
let instrumentoSeleccionado = null;

function descripcionMercado(codigo) {
  if (codigo === "F") return "Renta Fija";

  if (codigo === "V") return "Renta Variable";

  return codigo;
}

function badgeMercado(codigo) {
  if (codigo === "F") {
    return '<span class="badge bg-primary">Renta Fija</span>';
  }

  if (codigo === "V") {
    return '<span class="badge bg-success">Renta Variable</span>';
  }

  return codigo;
}

const tabla = document.querySelector("#tablaInstrumentos tbody");

const modal = new bootstrap.Modal(document.getElementById("modalInstrumento"));

async function cargarInstrumentos() {
  const res = await fetch("/api/instrumento");

  instrumentos = await res.json();

  tabla.innerHTML = "";

  instrumentos.forEach((inst, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${inst.id_instrumento}</td>
        <td>${inst.nombre}</td>
        <td>${badgeMercado(inst.tipo_mercado)}</td>
    `;

    tr.onclick = () => seleccionarFila(tr, inst);

    tabla.appendChild(tr);
  });
}

function seleccionarFila(tr, inst) {
  document
    .querySelectorAll("#tablaInstrumentos tr")
    .forEach((f) => f.classList.remove("table-primary"));

  tr.classList.add("table-primary");

  instrumentoSeleccionado = inst;
}

function nuevoInstrumento() {
  instrumentoSeleccionado = null;

  document.getElementById("tituloModal").innerText = "Nuevo Instrumento";

  document.getElementById("formInstrumento").reset();

  document.getElementById("id_instrumento").disabled = false;

  modal.show();
}

function editarInstrumento() {
  if (!instrumentoSeleccionado) {
    mostrarMensaje("Seleccione un instrumento");

    return;
  }

  document.getElementById("tituloModal").innerText = "Editar Instrumento";

  document.getElementById("id_instrumento").value =
    instrumentoSeleccionado.id_instrumento;

  document.getElementById("nombre").value = instrumentoSeleccionado.nombre;

  document.getElementById("tipo_mercado").value =
    instrumentoSeleccionado.tipo_mercado;

  document.getElementById("id_instrumento").disabled = true;

  modal.show();
}

async function guardarInstrumento() {
  const instrumento = {
    id_instrumento: document.getElementById("id_instrumento").value,

    nombre: document.getElementById("nombre").value,

    tipo_mercado: document.getElementById("tipo_mercado").value,
  };

  if (instrumentoSeleccionado) {
    await fetch("/api/instrumento/" + instrumento.id_instrumento, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(instrumento),
    });
  } else {
    await fetch("/api/instrumento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(instrumento),
    });
  }

  modal.hide();

  cargarInstrumentos();
}

async function eliminarInstrumento() {
  if (!instrumentoSeleccionado) {
    mostrarMensaje("Seleccione un instrumento");
    return;
  }

  if (!confirm("¿Eliminar instrumento?")) return;

  await fetch("/api/instrumento/" + instrumentoSeleccionado.id_instrumento, {
    method: "DELETE",
  });

  cargarInstrumentos();
}

function mostrarMensaje(texto) {
  const toastEl = document.getElementById("toastMensaje");

  document.getElementById("textoToast").innerText = texto;

  const toast = new bootstrap.Toast(toastEl);

  toast.show();
}

cargarInstrumentos();
