# Diagrama de estados da senha — inconsistente

```plantuml
@startuml
[*] --> WAITING : createTicket()
WAITING --> IN_SERVICE : getNext() [fila não vazia] / serve()
WAITING --> WAITING : getNext() [fila vazia]
IN_SERVICE --> FINISHED : finishTicket(number) [há atendimento] / finish()
IN_SERVICE --> IN_SERVICE : finishTicket(number) [sem atendimento para finalizar]
FINISHED --> [*]

note right of WAITING
  A fila é FIFO: a próxima senha a entrar em atendimento
  é a mais antiga de estado WAITING.
end note

note right of IN_SERVICE
  Só pode existir uma senha em atendimento por vez.
end note
@enduml
```

## Política de transição

- `getNext()` só produz transição quando existe uma senha aguardando na fila.
- Se não houver senha em `WAITING`, a operação não altera o estado da fila.
- `finishTicket(number)` só pode concluir uma senha quando existe atendimento em curso; caso contrário, o estado permanece inalterado.
- Não há transição de `FINISHED` para `WAITING` ou `IN_SERVICE` dentro do escopo aprovado.

