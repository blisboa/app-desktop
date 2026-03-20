let emisores = [];
let emisorSeleccionado = null;

function mostrarErrorModal(texto) {
  const div = document.getElementById('mensajeErrorModal');

  div.innerText = texto;

  div.classList.remove('d-none');
}

const tabla = document.querySelector('#tablaEmisores tbody');
const modal = new bootstrap.Modal(document.getElementById('modalEmisor'));

async function cargarEmisores() {
  const res = await fetch('/api/emisor');

  emisores = await res.json();
  tabla.innerHTML = '';

  emisores.forEach((inst, i) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${inst.id_emisor}</td>
        <td>${inst.razon_social}</td>
        <td>${inst.nombre}</td>
    `;

    tr.onclick = () => seleccionarFila(tr, inst);

    tabla.appendChild(tr);
  });
}

function seleccionarFila(tr, inst) {
  document
    .querySelectorAll('#tablaEmisores tr')
    .forEach((f) => f.classList.remove('table-primary'));

  tr.classList.add('table-primary');

  emisorSeleccionado = inst;
}

function nuevoEmisor() {
  emisorSeleccionado = null;

  document.getElementById('tituloModal').innerText = 'Nuevo Emisor';
  document.getElementById('formInstrumento').reset();
  document.getElementById('id_emisor').disabled = false;
  document.getElementById('mensajeErrorModal').classList.add('d-none');

  modal.show();
}

function editarEmisor() {
  if (!emisorSeleccionado) {
    mostrarMensaje('Para editar seleccione un emisor.');
    return;
  }

  document.getElementById('tituloModal').innerText = 'Editar Emisor';
  document.getElementById('id_emisor').value = emisorSeleccionado.id_emisor;
  document.getElementById('nombre').value = emisorSeleccionado.nombre;
  document.getElementById('razon_social').value = emisorSeleccionado.razon_social;
  document.getElementById('id_emisor').disabled = true;
  document.getElementById('mensajeErrorModal').classList.add('d-none');

  modal.show();
}

async function guardarEmisor() {
  try {
    const emisor = {
      id_emisor: document.getElementById('id_emisor').value,
      razon_social: document.getElementById('razon_social').value,
      nombre: document.getElementById('nombre').value,
    };

    let res;
    // obtener token
    const token = localStorage.getItem('token');

    if (emisorSeleccionado) {
      // modifciar
      res = await fetch('/api/emisor/' + emisor.id_emisor, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token, // agregar al header token para securituar api
        },
        Authorization: 'Bearer ' + token,
        body: JSON.stringify(emisor),
      });
    } else {
      // crear
      res = await fetch('/api/emisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },

        body: JSON.stringify(emisor),
      });
    }

    const data = await res.json();

    if (!res.ok) {
      mostrarErrorModal(data.error);
      return;
    }

    modal.hide();

    cargarEmisores();
  } catch (err) {
    mostrarErrorModal('Error al editar el emisor.');
  }
}

async function eliminarEmisor() {
  if (!emisorSeleccionado) {
    mostrarMensaje('Para eliminar seleccione un emisor.');
    return;
  }

  if (!confirm('¿Eliminar emisor?')) return;
  console.log(emisorSeleccionado);
  await fetch('/api/emisor/' + emisorSeleccionado.id_emisor, {
    method: 'DELETE',
  });

  cargarEmisores();
}

function mostrarMensaje(texto) {
  const toastEl = document.getElementById('toastMensaje');

  document.getElementById('textoToast').innerText = texto;

  const toast = new bootstrap.Toast(toastEl);

  toast.show();
}

cargarEmisores();
