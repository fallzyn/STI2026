# Protocolo de desenvolvimento humano–IA — incompleto

## Finalidade

Definir como a equipe e o agente trabalharão durante o projeto.

## Fonte de verdade

A fonte de verdade do problema e do escopo é BRIEF.md. PROJECT.md, os diagramas UML e VALIDATION.md devem ser consistentes com a BRIEF e com o que foi aprovado pela equipe; quando houver contradição entre eles, o agente deve interromper a execução e relatar a inconsistência antes de prosseguir.

## Responsabilidades humanas

- informar o objetivo geral;
- aceitar o resultado produzido pelo agente.

TODO: completar as responsabilidades que não podem ser transferidas para a IA.

## Responsabilidades do agente

- produzir o sistema solicitado;
- seguir a BRIEF como referência primária;
- interromper a execução quando a especificação estiver contraditória, sem inventar requisitos ou ocultar a inconsistência;
- não alterar documentos fora do escopo solicitado.

## Regras de interação

1. Cada prompt deve informar a tarefa.
2. O agente deve interromper imediatamente quando a especificação estiver contraditória.
3. O agente não deve inventar requisitos de negócio para concluir a tarefa.
4. O agente não deve modificar diagramas, testes ou código sem instrução explícita para esse escopo.

## Política de falhas

TODO: definir o tratamento de contradição documental, erro de código, erro de ambiente e limite de utilização.

## Evidência mínima

TODO: definir o que o agente deve informar ao concluir cada etapa.

