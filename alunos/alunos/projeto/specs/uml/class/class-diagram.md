# Diagrama de classes — inconsistente

```plantuml
@startuml
hide empty members
skinparam classAttributeIconSize 0

enum TicketStatus {
  WAITING
  IN_SERVICE
  FINISHED
}

class Ticket {
  +number: Number
  +status: TicketStatus
  +createdAt: Date
  +serve(): void
  +finish(): void
}

class QueueManager {
  -tickets: Ticket[]
  -currentTicket: Ticket
  -nextNumber: Number
  +createTicket(): Ticket
  +getNext(): Ticket
  +finishTicket(number): Ticket
  +hasWaitingTickets(): Boolean
}

Ticket --> TicketStatus : status
QueueManager "1" *-- "0..*" Ticket : stores
QueueManager --> Ticket : currentTicket

note right of QueueManager
  FIFO ordering is enforced for waiting tickets.
  At most one ticket may be in IN_SERVICE.
  When there is no waiting ticket, getNext() returns null.
  When there is no active ticket, finishTicket(number) has no effect.
end note
@enduml
```

## Contratos complementares

- A fila mantém as senhas em ordem de chegada.
- O gerenciador pode ter, no máximo, uma senha em atendimento (`IN_SERVICE`).
- `getNext()` deve retornar a próxima senha `WAITING` da fila; se não houver, retorna nulo.
- `finishTicket(number)` deve finalizar apenas a senha atual em atendimento; se não houver atendimento, não altera a fila.

