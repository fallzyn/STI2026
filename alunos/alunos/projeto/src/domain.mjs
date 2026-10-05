export const TicketStatus = Object.freeze({
  WAITING: 'WAITING',
  IN_SERVICE: 'IN_SERVICE',
  FINISHED: 'FINISHED',
});

export class Ticket {
  constructor(number) {
    this.number = number;
    this.status = TicketStatus.WAITING;
    this.createdAt = new Date();
  }

  serve() {
    this.status = TicketStatus.IN_SERVICE;
    return this;
  }

  finish() {
    this.status = TicketStatus.FINISHED;
    return this;
  }
}

export class QueueManager {
  constructor() {
    this.tickets = [];
    this.currentTicket = null;
    this.nextNumber = 1;
  }

  createTicket() {
    const ticket = new Ticket(this.nextNumber);
    this.nextNumber += 1;
    this.tickets.push(ticket);
    return ticket;
  }

  hasWaitingTickets() {
    return this.tickets.some((ticket) => ticket.status === TicketStatus.WAITING);
  }

  getNext() {
    if (this.currentTicket !== null) {
      return null;
    }

    const waitingTicket = this.tickets.find((ticket) => ticket.status === TicketStatus.WAITING);
    if (!waitingTicket) {
      return null;
    }

    waitingTicket.serve();
    this.currentTicket = waitingTicket;
    return waitingTicket;
  }

  finishTicket(number) {
    if (!this.currentTicket || this.currentTicket.number !== number) {
      return null;
    }

    this.currentTicket.finish();
    const finishedTicket = this.currentTicket;
    this.currentTicket = null;
    return finishedTicket;
  }

  getQueueView() {
    const waiting = this.tickets.filter((ticket) => ticket.status === TicketStatus.WAITING);
    const inService = this.tickets.filter((ticket) => ticket.status === TicketStatus.IN_SERVICE);
    const finished = this.tickets.filter((ticket) => ticket.status === TicketStatus.FINISHED);

    return {
      waiting,
      inService,
      finished,
    };
  }
}

export class QueueService extends QueueManager {}

export default QueueManager;
