# Regras de negócio

## RN-01 — Numeração

As senhas recebem números em sequência, começando em 1 para cada sessão da aplicação.

- O próximo número incrementa em 1 a cada emissão de senha.
- A numeração é reinicializada quando a página é recarregada, porque os dados ficam apenas em memória durante a sessão.

## RN-02 — Escolha da próxima senha

O sistema deve escolher a próxima senha aguardando pela ordem de chegada.

- Não há senhas prioritárias.
- A primeira senha em estado `WAITING` na fila é a selecionada para atendimento.
- O atendente não escolhe manualmente a próxima senha.

## RN-03 — Estados

Uma senha pode estar em um dos seguintes estados:

- `WAITING`: aguardando atendimento.
- `IN_SERVICE`: em atendimento atual.
- `FINISHED`: atendimento encerrado.

Transições permitidas:

- `WAITING -> IN_SERVICE`: quando a senha é chamada pelo atendente.
- `IN_SERVICE -> FINISHED`: quando o atendente finaliza o atendimento.
- Não há transição de volta a `WAITING` a partir de `FINISHED` dentro do escopo aprovado.

## RN-04 — Atendimento simultâneo

A aplicação admite apenas um atendente e um único atendimento em curso.

- A fila pode ter várias senhas aguardando, mas somente uma pode estar em `IN_SERVICE` por vez.
- Não há atendimento concorrente nem múltiplos atendentes.

## RN-05 — Finalização

O atendente pode finalizar uma senha informando seu número.

- A finalização só é válida quando a senha informada está em `IN_SERVICE`.
- A senha finalizada passa para `FINISHED`.
- O sistema não define cancelamento nem reabertura de atendimento.

