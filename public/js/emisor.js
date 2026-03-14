let instrumentos = [];
let instrumentoSeleccionado = null;

function mostrarErrorModal(texto) {
  const div = document.getElementById('mensajeErrorModal');

  div.innerText = texto;

  div.classList.remove('d-none');
}

function descripcionMercado(codigo) {
  if (codigo === 'F') return 'Renta Fija';

  if (codigo === 'V') return 'Renta Variable';

  return codigo;
}

function badgeMercado(codigo) {
  if (codigo === 'F') {
    return '<span class="badge bg-primary">Renta Fija</span>';
  }

  if (codigo === 'V') {
    return '<span class="badge bg-success">Renta Variable</span>';
  }

  return codigo;
}

const tabla = document.querySelector('#tablaEmisores tbody');

const modal = new bootstrap.Modal(document.getElementById('modalEmisor'));

// aqui tengo que modifciar para que muestre emisores en vez de los instrumnetos
async function cargarEmisores() {
  const res = await fetch('/api/emisor');

  instrumentos = await res.json();

  tabla.innerHTML = '';

  instrumentos.forEach((inst, i) => {
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

  instrumentoSeleccionado = inst;
}

function nuevoEmisor() {
  instrumentoSeleccionado = null;

  document.getElementById('tituloModal').innerText = 'Nuevo Emisor';
  document.getElementById('formInstrumento').reset();
  document.getElementById('id_emisor').disabled = false;
  document.getElementById('mensajeErrorModal').classList.add('d-none');

  modal.show();
}

function editarEmisor() {
  if (!instrumentoSeleccionado) {
    mostrarMensaje('Seleccione un emisor');
    return;
  }

  document.getElementById('tituloModal').innerText = 'Editar Emisor';
  document.getElementById('id_emisor').value = instrumentoSeleccionado.id_emisor;
  document.getElementById('nombre').value = instrumentoSeleccionado.nombre;
  document.getElementById('razon_social').value = instrumentoSeleccionado.razon_social;
  document.getElementById('id_emisor').disabled = true;
  document.getElementById('mensajeErrorModal').classList.add('d-none');

  modal.show();
}

async function guardarEmisor() {
  const instrumento = {
    id_instrumento: document.getElementById('id_emisor').value,
    nombre: document.getElementById('razon_social').value,
    tipo_mercado: document.getElementById('nombre').value,
  };

  let res;
  // obtener token
  const token = localStorage.getItem('token');

  /*
  if (!token) {
    window.location.href = "/index.html";
    return;
  }
    */

  if (instrumentoSeleccionado) {
    // modifciar
    res = await fetch('/api/instrumento/' + instrumento.id_emisor, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token, // agregar al header token para securituar api
      },
      Authorization: 'Bearer ' + token,
      body: JSON.stringify(instrumento),
    });
  } else {
    // crear
    res = await fetch('/api/instrumento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },

      body: JSON.stringify(instrumento),
    });
  }

  const data = await res.json();

  if (!res.ok) {
    mostrarErrorModal(data.error);
    return;
  }

  modal.hide();

  cargarInstrumentos();
}

async function eliminarEmisor() {
  if (!instrumentoSeleccionado) {
    mostrarMensaje('Seleccione un emisor');
    return;
  }

  if (!confirm('¿Eliminar emisor?')) return;
  console.log(instrumentoSeleccionado);
  await fetch('/api/emisor/' + instrumentoSeleccionado.id_emisor, {
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
