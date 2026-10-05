# UC-01 — Emitir senha — incompleto

## Objetivo

Criar uma senha para o aluno e exibir o número recebido.

## Ator principal

Aluno.

## Pré-condições

- A aplicação está aberta em uma única página.
- O sistema está pronto para receber uma nova senha.

## Gatilho

O aluno aciona **Emitir senha**.

## Fluxo principal

1. A interface solicita a criação de uma nova senha ao gerenciador da fila.
2. O sistema atribui o próximo número disponível, em sequência, para a nova senha.
3. A nova senha é registrada como `WAITING` e entra no fim da fila.
4. A interface apresenta o número gerado ao aluno.
5. A fila atualizada é exibida na tela.

## Fluxos alternativos

- Nenhum fluxo alternativo é definido no escopo aprovado: a operação é apenas de emissão de senha; não há cancelamento, autenticação, persistência nem fila prioritária.

## Pós-condições

- Existe uma nova senha na fila com número atribuído.
- A senha nova permanece em estado `WAITING` até que seja chamada.

## Regras relacionadas

- RN-01 — Numeração.
- RN-02 — Escolha da próxima senha.
- RN-03 — Estados.

