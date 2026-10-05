# Sequência — UC-03 Finalizar atendimento — incompleta

```plantuml
@startuml
actor Atendente
boundary Interface
control QueueManager
entity Ticket

Atendente -> Interface: informa número e aciona Finalizar
Interface -> QueueManager: finishTicket(number)

alt Não há atendimento para finalizar
  QueueManager --> Interface: null
  Interface --> Atendente: informa que não há atendimento para finalizar
else Há atendimento em curso
  QueueManager -> Ticket: finish()
  Ticket -> Ticket: status = FINISHED
  QueueManager --> Interface: ticket
  Interface --> Atendente: confirma finalização
  Interface --> Atendente: atualiza fila
end
@enduml
```

