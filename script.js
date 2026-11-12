const toast = document.getElementById('toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// Relógio orbital: horário local do dispositivo, atualizado a cada segundo.
function updateClock() {
  const now = new Date();
  document.getElementById('clock').innerHTML =
    now.toLocaleTimeString('pt-BR', { hour12: false }) + ' <small>LOCAL</small>';
}
updateClock();
setInterval(updateClock, 1000);

// Sincronização demonstrativa e registro de telemetria.
document.getElementById('sync').addEventListener('click', () => {
  const button = document.getElementById('sync');
  button.innerHTML = '✓ <span>Dados sincronizados</span>';
  notify('Telemetria atualizada. Todos os indicadores foram sincronizados.');
  addLog('SISTEMA', 'Sincronização manual concluída pelo Comando Alpha.', 'INFO');
  setTimeout(() => button.innerHTML = '↻ <span>Sincronizar dados</span>', 2400);
});

function addLog(source, message, level) {
  const list = document.getElementById('log-list');
  const row = document.createElement('div');
  row.className = 'log-row';
  const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
  const dotClass = level === 'ALERTA' ? 'log-warn' : 'log-ok';
  row.innerHTML = `<time>${time}</time><span class="${dotClass}">●</span><p><b>${source}</b> — ${message}</p><small>${level}</small>`;
  list.prepend(row);
  while (list.children.length > 5) list.lastElementChild.remove();
}

// Ativação simulada dos painéis auxiliares.
document.getElementById('solar').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.innerHTML = '✓ Painéis auxiliares ativados';
  button.style.background = '#70d1a2';
  button.style.color = '#102219';
  notify('Painéis auxiliares ativados. Reserva energética em recuperação.');
  addLog('ENERGIA', 'Painéis solares auxiliares ativados pelo Comando Alpha.', 'INFO');
});

// Central de notificações.
document.getElementById('notifications').addEventListener('click', () => {
  notify('Central de alertas: 1 alerta de prioridade média sobre energia.');
});

// Navegação com indicação visual da seção selecionada.
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('selected'));
    link.classList.add('selected');
  });
});
