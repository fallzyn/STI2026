# Plano de validação

## Estratégia

O sistema será validado por testes automatizados em Node.js e por observação manual do comportamento da fila em uma única página, sempre em conformidade com a especificação congelada.

## Critérios automatizados

| ID | Critério de aceitação | Cobertura |
|---|---|---|
| AC-01 | Cada senha emitida recebe um número sequencial, começando em 1, e entra no estado `WAITING`. | UC-01, RN-01, RN-03 |
| AC-02 | A fila respeita ordem FIFO, sem prioridade e sem escolha manual do atendente. | UC-01, UC-02, RN-02 |
| AC-03 | A operação de chamar a próxima senha seleciona a primeira aguardando e a coloca em `IN_SERVICE`. | UC-02, RN-02, RN-03 |
| AC-04 | Existe apenas uma senha em atendimento ao mesmo tempo. | UC-02, RN-04 |
| AC-05 | Quando não há senha aguardando, a chamada da próxima senha não altera a fila e retorna ausência de atendimento. | UC-02, RN-02 |
| AC-06 | A finalização exige uma senha em atendimento; se não houver atendimento, não há alteração, e se houver, a senha vai para `FINISHED`. | UC-03, RN-03, RN-05 |
| AC-07 | A visualização da fila exibe corretamente as senhas em `WAITING`, `IN_SERVICE` e `FINISHED`. | UC-04, RN-03 |

## Testes esperados

A suíte de testes deve importar `../src/domain.mjs` com o runner nativo do Node (`node:test`) e deve falhar neste momento porque a implementação ainda não existe.

## Validação manual

Os cenários devem verificar visualmente:

- emissão de senhas em sequência;
- chamada da próxima senha seguindo FIFO;
- ausência de múltiplos atendimentos;
- ausência de senhas aguardando quando a fila está vazia;
- finalização do atendimento atual;
- atualização da exibição das filas por status.

## Matriz de rastreabilidade

| Caso de uso | Regras | Diagrama principal | Critério |
|---|---|---|---|
| UC-01 | RN-01, RN-02, RN-03 | UML de casos de uso | AC-01, AC-02 |
| UC-02 | RN-02, RN-03, RN-04 | UML de casos de uso | AC-03, AC-04, AC-05 |
| UC-03 | RN-03, RN-04, RN-05 | UML de casos de uso | AC-06 |
| UC-04 | RN-02, RN-03 | UML de casos de uso | AC-07 |

