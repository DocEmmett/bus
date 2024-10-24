const busTimesContainer = document.getElementById('bus-times');

function fetchBusTimes() {
  fetch('https://vitesia.mytrama.com/emtusasiri/paradas/parada/17')
    .then(response => response.json())
    .then(data => {
      busTimesContainer.innerHTML = ''; // Clear previous data
      const llegadas = data.llegadas.filter(llegada => llegada.linea.idlinea === 1); // Filtra por línea si es necesario
      
      llegadas.forEach(llegada => {
        const busInfo = document.createElement('div');
        busInfo.classList.add('bus-info');
        busInfo.innerHTML = `
          <div class="bus-line">Línea: ${llegada.linea.descripcion} (${llegada.linea.codigo})</div>
          <div>Destino: ${llegada.trayecto.destino}</div>
          <div>Minutos: ${llegada.minutos}</div>
          <div>Distancia: ${llegada.distancia} metros</div>
          <div>Hora Actualización: ${llegada.horaActualizacion}</div>
          <div>Fecha Actualización: ${llegada.fechaActualizacion}</div>
        `;
        busTimesContainer.appendChild(busInfo);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Fetch bus times every 30 seconds
setInterval(fetchBusTimes, 30000);

// Initial fetch
fetchBusTimes();
