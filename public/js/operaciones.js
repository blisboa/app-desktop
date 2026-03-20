async function cargarFondos() {
  const res = await fetch('/api/fondos');
  const data = await res.json();

  const select = document.getElementById('fondo');
  select.innerHTML = `<option value="">Todos</option>`;

  data.forEach((f) => {
    select.innerHTML += `<option value="${f.id_fondo}">${f.nombre}</option>`;
  });
}

async function buscar() {
  const fondo = document.getElementById('fondo').value;
  const tipo = document.getElementById('tipo').value;
  const desde = document.getElementById('desde').value;
  const hasta = document.getElementById('hasta').value;

  const params = new URLSearchParams({
    id_fondo: fondo,
    tipo,
    fecha_desde: desde,
    fecha_hasta: hasta,
  });

  const res = await fetch(`/api/operaciones?${params}`);

  const response = await res.json();

  if (response.status === 'error') {
    alert(response.message);
    return;
  }

  const tabla = document.getElementById('tabla');
  tabla.innerHTML = '';

  const data = response.data;

  if (data.length === 0) {
    tabla.innerHTML = `
                    <tr>
                        <td colspan="8" class="text-center text-muted">
                            No se encontraron operaciones.
                        </td>
                    </tr>
                `;
    return;
  }

  // OK
  data.forEach((o) => {
    tabla.innerHTML += `
                <tr>
                    <td>${o.id_operacion}</td>
                    <td>${o.fondo_nombre}</td>
                    <td>${o.tipo}</td>
                    <td>${o.fecha}</td>
                    <td>${o.monto}</td>
                    <td>${o.id_nemotecnico || ''}</td>
                    <td>${o.cantidad || ''}</td>
                    <td>${o.precio || ''}</td>
                </tr>
                `;
  });
}

cargarFondos();
