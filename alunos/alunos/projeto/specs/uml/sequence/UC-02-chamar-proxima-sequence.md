# Sequência — UC-02 Chamar próxima senha — incompleta

```plantuml
@startuml
actor Atendente
boundary Interface
control QueueManager
entity Ticket

Atendente -> Interface: aciona Chamar próxima
Interface -> QueueManager: getNext()

alt Não há senha aguardando
  QueueManager --> Interface: null
  Interface --> Atendente: informa que não há senha aguardando
else Há senha aguardando
  QueueManager -> QueueManager: currentTicket = primeiro ticket em WAITING (FIFO)
  QueueManager -> Ticket: serve()
  Ticket -> Ticket: status = IN_SERVICE
  QueueManager --> Interface: ticket
  Interface --> Atendente: mostra senha em atendimento
  Interface --> Atendente: atualiza fila
end
@enduml
```

