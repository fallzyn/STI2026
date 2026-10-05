# Sequência — UC-01 Emitir senha — incompleta

```plantuml
@startuml
actor Aluno
boundary Interface
control QueueManager
entity Ticket

Aluno -> Interface: aciona Emitir senha
Interface -> QueueManager: createTicket()
QueueManager -> QueueManager: nextNumber = nextNumber + 1
QueueManager -> Ticket: new(number)
QueueManager -> QueueManager: enfileira(ticket) em ordem de chegada
QueueManager --> Interface: ticket
Interface --> Aluno: mostra número
Interface --> Aluno: exibe fila atualizada
@enduml
```

