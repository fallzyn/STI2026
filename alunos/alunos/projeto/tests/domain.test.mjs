import test from 'node:test';
import assert from 'node:assert/strict';

import { QueueManager, TicketStatus } from '../src/domain.mjs';

test('AC-01 — cria senhas com numeração sequencial e estado WAITING', () => {
  const queue = new QueueManager();

  const first = queue.createTicket();
  const second = queue.createTicket();

  assert.equal(first.number, 1);
  assert.equal(second.number, 2);
  assert.equal(first.status, TicketStatus.WAITING);
  assert.equal(second.status, TicketStatus.WAITING);
});

test('AC-02 — mantém a fila em ordem FIFO', () => {
  const queue = new QueueManager();

  queue.createTicket();
  queue.createTicket();
  queue.createTicket();

  const first = queue.getNext();
  assert.ok(first);
  assert.equal(first.number, 1);
  assert.equal(first.status, TicketStatus.IN_SERVICE);

  const second = queue.getNext();
  assert.equal(second, null);
});

test('AC-03 — chama a próxima senha aguardando e a coloca em IN_SERVICE', () => {
  const queue = new QueueManager();

  const first = queue.createTicket();
  const second = queue.createTicket();

  const summoned = queue.getNext();

  assert.ok(summoned);
  assert.equal(summoned.number, first.number);
  assert.equal(summoned.status, TicketStatus.IN_SERVICE);
  assert.equal(queue.currentTicket.number, first.number);
  assert.equal(queue.hasWaitingTickets(), true);
  assert.equal(queue.getQueueView().waiting.map((ticket) => ticket.number).join(','), '2');
});

test('AC-04 — permite apenas uma senha em atendimento simultaneamente', () => {
  const queue = new QueueManager();

  queue.createTicket();
  queue.createTicket();

  const first = queue.getNext();
  const second = queue.getNext();

  assert.ok(first);
  assert.equal(second, null);
  assert.equal(queue.currentTicket.number, first.number);
  assert.equal(queue.getQueueView().inService.length, 1);
});

test('AC-05 — quando não há senha aguardando, getNext não altera a fila', () => {
  const queue = new QueueManager();

  const result = queue.getNext();

  assert.equal(result, null);
  assert.equal(queue.hasWaitingTickets(), false);
  assert.equal(queue.currentTicket, null);
  assert.deepEqual(queue.getQueueView(), {
    waiting: [],
    inService: [],
    finished: [],
  });
});

test('AC-06 — finaliza apenas a senha em atendimento e rejeita atendimento inexistente', () => {
  const queue = new QueueManager();

  const first = queue.createTicket();
  const second = queue.createTicket();

  const before = queue.finishTicket(999);
  assert.equal(before, null);

  const current = queue.getNext();
  assert.ok(current);
  assert.equal(current.number, first.number);

  const finished = queue.finishTicket(first.number);
  assert.ok(finished);
  assert.equal(finished.status, TicketStatus.FINISHED);
  assert.equal(queue.currentTicket, null);

  const invalid = queue.finishTicket(second.number);
  assert.equal(invalid, null);
});

test('AC-07 — a visão da fila exibe corretamente senhas aguardando, em atendimento e finalizadas', () => {
  const queue = new QueueManager();

  const first = queue.createTicket();
  const second = queue.createTicket();
  const third = queue.createTicket();

  const active = queue.getNext();
  assert.ok(active);
  assert.equal(active.number, first.number);

  queue.finishTicket(first.number);
  const next = queue.getNext();
  assert.ok(next);
  assert.equal(next.number, second.number);

  queue.finishTicket(second.number);

  const view = queue.getQueueView();

  assert.deepEqual(view.waiting.map((ticket) => ticket.number), [third.number]);
  assert.deepEqual(view.inService.map((ticket) => ticket.number), []);
  assert.deepEqual(view.finished.map((ticket) => ticket.number), [first.number, second.number]);
});
