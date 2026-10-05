# UC-03 — Finalizar atendimento — incompleto

## Objetivo

Finalizar o atendimento atual de uma senha e registrar o encerramento do atendimento.

## Ator principal

Atendente.

## Pré-condições

- A aplicação está aberta.
- Existe uma senha com estado `IN_SERVICE`.
- O atendente conhece o número da senha em atendimento.

## Gatilho

O atendente informa o número da senha e aciona **Finalizar**.

## Fluxo principal

1. A interface envia o número informado ao gerenciador da fila.
2. O sistema verifica se a senha informada existe e está em atendimento.
3. O sistema altera o estado dessa senha para `FINISHED`.
4. A interface confirma a finalização e atualiza a exibição da fila.

## Fluxos alternativos

- Fluxo alternativo A — senha inexistente: se o número informado não corresponder a uma senha cadastrada, o sistema não finaliza nenhuma senha e mantém o estado atual da fila.
- Fluxo alternativo B — ausência de atendimento: se não houver senha em estado `IN_SERVICE`, o sistema não realiza a finalização e mantém a interface sem alteração.
- Fluxo alternativo C — número de outra senha: se o número informado não pertencente à senha em atendimento, o sistema não altera a fila e mantém a operação sem efeito.

## Pós-condições

- A senha informada passa para o estado `FINISHED`.
- A fila e a tela refletem que o atendimento foi encerrado.

## Regras relacionadas

- RN-03 — Estados.
- RN-04 — Atendimento simultâneo.
- RN-05 — Finalização.

