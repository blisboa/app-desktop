let detalles = [];

// ==========================
// CARGAR FONDOS
// ==========================
async function cargarFondos() {
  const res = await fetch('/api/fondos');
  const data = await res.json();

  const select = document.getElementById('fondo');
  select.innerHTML = `<option value="">Seleccione</option>`;

  data.forEach((f) => {
    select.innerHTML += `<option value="${f.id_fondo}">${f.nombre}</option>`;
  });
}

// ==========================
// VALIDAR NEMO
// ==========================
async function validarNemo() {
  const nemo = document.getElementById('nemo').value.trim();

  if (!nemo) return;

  try {
    const res = await fetch(`/api/nemotecnicos/${nemo}`);

    if (!res.ok) {
      alert('Nemotécnico no existe');
      document.getElementById('nemo').value = '';
      document.getElementById('nemo').focus();
    }
  } catch (err) {
    alert('Error validando nemotécnico');
  }
}

// ==========================
// AGREGAR DETALLE
// ==========================
function agregarDetalle() {
  const nemo = document.getElementById('nemo').value.trim();
  const cantidad = parseFloat(document.getElementById('cantidad').value);
  const precio = parseFloat(document.getElementById('precio').value);

  if (!nemo) return alert('Ingrese nemotécnico');
  if (!cantidad || cantidad <= 0) return alert('Cantidad inválida');
  if (!precio || precio <= 0) return alert('Precio inválido');

  const existe = detalles.find((d) => d.id_nemotecnico === nemo);
  if (existe) return alert('Ese nemotécnico ya fue agregado');

  detalles.push({ id_nemotecnico: nemo, cantidad, precio });

  renderTabla();

  document.getElementById('nemo').value = '';
  document.getElementById('cantidad').value = '';
  document.getElementById('precio').value = '';
}

// ==========================
// RENDER TABLA
// ==========================
function renderTabla() {
  const tabla = document.getElementById('tablaDetalle');
  tabla.innerHTML = '';

  let total = 0;

  detalles.forEach((d, index) => {
    const subtotal = d.cantidad * d.precio;
    total += subtotal;

    tabla.innerHTML += `
      <tr>
        <td>${d.id_nemotecnico}</td>
        <td>${d.cantidad}</td>
        <td>${d.precio}</td>
        <td>${subtotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminar(${index})">X</button>
        </td>
      </tr>
    `;
  });

  document.getElementById('total').innerText = total.toFixed(2);
}

// ==========================
// ELIMINAR DETALLE
// ==========================
function eliminar(index) {
  detalles.splice(index, 1);
  renderTabla();
}

// ==========================
// GUARDAR COMPRA
// ==========================
async function guardar() {
  const fondo = document.getElementById('fondo').value;
  const fecha = document.getElementById('fecha').value;

  if (!fondo) return alert('Seleccione fondo');
  if (!fecha) return alert('Seleccione fecha');
  if (detalles.length === 0) return alert('Debe ingresar al menos un detalle');

  try {
    const res = await fetch('/api/operaciones/compra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_fondo: fondo,
        fecha,
        detalles,
      }),
    });

    const response = await res.json();
    console.log('data grabar compra', response.data);
    alert('Compra guardada ID: ' + response.data.id_operacion);

    detalles = [];
    renderTabla();
  } catch (err) {
    alert('Error al guardar');
  }
}

// ==========================
cargarFondos();
