# UC-02 — Chamar próxima senha — incompleto

## Objetivo

Permitir que o atendente chame a próxima senha aguardando e inicie o atendimento atual.

## Ator principal

Atendente.

## Pré-condições

- A aplicação está aberta.
- Existe pelo menos uma senha no estado `WAITING`.
- Não há outra senha em atendimento, porque o sistema admite apenas um atendente e um atendimento simultâneo.

## Gatilho

O atendente aciona **Chamar próxima**.

## Fluxo principal

1. A interface solicita a próxima senha ao gerenciador da fila.
2. O sistema identifica a senha mais antiga em estado `WAITING`.
3. O sistema altera o estado dessa senha para `IN_SERVICE`.
4. A interface exibe a senha em atendimento para o atendente.
5. A fila é atualizada na tela para refletir o novo estado.

## Fluxos alternativos

- Fluxo alternativo A — fila vazia: se não houver senhas em estado `WAITING`, o sistema não chama nenhuma senha e mantém a interface indicando que não há senhas aguardando.
- Fluxo alternativo B — atendimento já em curso: se já houver uma senha em estado `IN_SERVICE`, o sistema não chama outra senha até que a atual seja finalizada; a interface mantém a senha atual como em atendimento.
- Fluxo alternativo C — várias senhas aguardando: o sistema seleciona a primeira pela ordem de chegada, sem prioridade, e não permite que o atendente escolha manualmente outra senha.

## Pós-condições

- Uma senha foi escolhida e passou para o estado `IN_SERVICE`.
- A senha em atendimento é a única senha em curso no momento.

## Regras relacionadas

- RN-02 — Escolha da próxima senha.
- RN-03 — Estados.
- RN-04 — Atendimento simultâneo.

