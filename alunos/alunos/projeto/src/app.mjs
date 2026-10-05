import { QueueManager } from './domain.mjs';

const queue = new QueueManager();
const tickets = [];
let currentTicket = null;

const emitButton = document.querySelector('#emit-ticket');
const callNextButton = document.querySelector('#call-next');
const finishButton = document.querySelector('#finish-ticket');
const finishNumberInput = document.querySelector('#finish-number');
const messageBox = document.querySelector('#message');
const currentTicketValue = document.querySelector('#current-ticket');
const waitingList = document.querySelector('#waiting-list');
const finishedList = document.querySelector('#finished-list');

function setMessage(text, kind = 'success') {
  messageBox.textContent = text;
  messageBox.style.color = kind === 'error' ? '#991b1b' : '#166534';
}

function renderList(listElement, items) {
  listElement.innerHTML = '';

  if (items.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'Nenhuma senha';
    listElement.appendChild(empty);
    return;
  }

  items.forEach((ticket) => {
    const item = document.createElement('li');
    item.textContent = `Senha ${ticket.number}`;
    listElement.appendChild(item);
  });
}

function renderQueue() {
  currentTicketValue.textContent = currentTicket ? `Senha ${currentTicket.number}` : 'Nenhuma';
  renderList(waitingList, tickets.filter((ticket) => ticket.status === 'WAITING'));
  renderList(finishedList, tickets.filter((ticket) => ticket.status === 'FINISHED'));
}

emitButton.addEventListener('click', () => {
  const ticket = queue.createTicket();
  tickets.push(ticket);
  setMessage(`Senha emitida: ${ticket.number}`);
  renderQueue();
});

callNextButton.addEventListener('click', () => {
  if (currentTicket) {
    setMessage(`A senha ${currentTicket.number} já está em atendimento. Finalize-a antes de chamar outra.`, 'error');
    return;
  }

  if (!queue.hasWaitingTickets()) {
    setMessage('Não há senhas aguardando.', 'error');
    return;
  }

  const ticket = queue.getNext();
  if (!ticket) {
    setMessage('Não há senhas aguardando.', 'error');
    return;
  }

  currentTicket = ticket;
  setMessage(`Senha chamada: ${ticket.number}`);
  renderQueue();
});

finishButton.addEventListener('click', () => {
  const rawValue = finishNumberInput.value.trim();

  if (rawValue === '') {
    setMessage('Informe o número da senha para finalizar.', 'error');
    return;
  }

  const number = Number(rawValue);

  if (!currentTicket) {
    setMessage('Não há atendimento para finalizar.', 'error');
    return;
  }

  if (currentTicket.number !== number) {
    setMessage(`A senha em atendimento é ${currentTicket.number}. Informe esse número para finalizar.`, 'error');
    return;
  }

  const finishedTicket = queue.finishTicket(number);
  if (!finishedTicket) {
    setMessage('Não há atendimento para finalizar.', 'error');
    return;
  }

  currentTicket = null;
  finishNumberInput.value = '';
  setMessage(`Atendimento finalizado: ${finishedTicket.number}`);
  renderQueue();
});

renderQueue();
setMessage('Sistema pronto para atendimento.');
