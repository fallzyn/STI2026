# UC-04 — Consultar fila

## Objetivo

Permitir que o atendente visualize o estado atual da fila, incluindo a senha em atendimento, as senhas aguardando e as senhas finalizadas.

## Ator principal

Atendente.

## Pré-condições

- A aplicação está aberta.
- A fila está ativa na sessão atual.

## Gatilho

A tela é aberta ou o atendente solicita a atualização da visualização da fila.

## Fluxo principal

1. O sistema obtém a lista de senhas da fila atual.
2. O sistema separa as senhas em `WAITING`, `IN_SERVICE` e `FINISHED`.
3. O sistema exibe a senha em atendimento, a ordem das senhas aguardando e o histórico das senhas finalizadas.
4. A interface permanece atualizada conforme as ações de emissão, chamada e finalização ocorrem.

## Fluxos alternativos

- Fluxo alternativo A — fila vazia: se não houver senhas aguardando, a área de espera aparece vazia.
- Fluxo alternativo B — nenhum atendimento em curso: se não houver senha `IN_SERVICE`, a interface indica ausência de atendimento atual.
- Fluxo alternativo C — nenhuma senha finalizada: se não houver senhas `FINISHED`, a área de finalizadas aparece vazia.

## Pós-condições

- A tela apresenta corretamente o estado atual da fila na sessão.
- A visualização reflete a ordem de chegada, o atendimento atual e as senhas encerradas.

## Regras relacionadas

- RN-02 — Escolha da próxima senha.
- RN-03 — Estados.
- RN-05 — Finalização.

