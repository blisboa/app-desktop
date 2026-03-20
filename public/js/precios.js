async function subirArchivo() {
  const input = document.getElementById('archivo');
  const file = input.files[0];

  if (!file) {
    alert('Seleccione un archivo');
    return;
  }

  const formData = new FormData();
  formData.append('archivo', file);

  document.getElementById('loading').style.display = 'block';
  document.getElementById('resultado').style.display = 'none';
  const token = localStorage.getItem('token');

  try {
    const res = await fetch('/api/precios/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token, // agregar al header token para securituar api
      },
      body: formData,
    });

    const data = await res.json();

    document.getElementById('loading').style.display = 'none';

    const div = document.getElementById('resultado');
    div.style.display = 'block';

    if (res.ok) {
      div.className = 'alert alert-success';
      div.innerText = `✔ ${data.mensaje}. Registros procesados: ${data.registros}`;
    } else {
      div.className = 'alert alert-danger';
      div.innerText = data.error;
    }
  } catch (err) {
    document.getElementById('loading').style.display = 'none';

    const div = document.getElementById('resultado');
    div.style.display = 'block';
    div.className = 'alert alert-danger';
    div.innerText = 'Error al subir archivo';
  }
}
