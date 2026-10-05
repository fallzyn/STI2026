# Roteiro de oito prompts

Os prompts foram escritos para o modo **Agent** do GitHub Copilot dentro de um Codespace. Execute-os na ordem. Antes de aceitar cada alteração, inspecione o diff.

Para o renderizar o plantuml use o servidor:

```url
http://plantuml.com/plantuml/svg/
```

## Prompt 1 — Auditoria sem edição

```text
Leia BRIEF.md, PROJECT.md, PROTOCOL.md, VALIDATION.md e todos os arquivos Markdown em specs/uml.

Não edite nenhum arquivo e não escreva código.

Produza uma auditoria curta contendo:
1. contradições entre documentos ou diagramas;
2. operações usadas em um diagrama e ausentes em outro;
3. estados com nomes incompatíveis;
4. fluxos alternativos não definidos;
5. decisões que precisam ser tomadas por humanos.

Para cada item, cite os arquivos envolvidos. Não escolha uma solução para as ambiguidades.
```

## Prompt 2 — Documentação independente

```text
Edite somente PROJECT.md e PROTOCOL.md.

Use BRIEF.md como fonte do problema. Resolva apenas as marcações TODO cuja decisão foi aprovada pela equipe:
- aplicação de página única;
- HTML, CSS e JavaScript sem bibliotecas externas;
- dados somente em memória durante a sessão;
- sem autenticação, banco, prioridade ou atendimento concorrente;
- a IA deve interromper quando a especificação estiver contraditória.

Não edite diagramas, testes ou src. Não acrescente requisitos de negócio em PROTOCOL.md. Ao final, apresente apenas o resumo do diff.
```

## Prompt 3 — Casos de uso

```text
Edite somente os arquivos de specs/uml/userCases.

Complete o diagrama e as especificações de casos de uso com base em BRIEF.md e PROJECT.md. Preserve os identificadores UC-01 a UC-04 e RN-01 a RN-05.

Cada especificação deve conter: objetivo, ator principal, pré-condições, gatilho, fluxo principal, fluxos alternativos, pós-condições e regras relacionadas.

Não invente prioridade, persistência, autenticação, cancelamento ou múltiplos atendimentos. Não edite classe, sequência, estados, testes ou código. Se uma decisão necessária não estiver documentada, pare e informe.
```

## Prompt 4 — Consistência UML

```text
Leia os casos de uso aprovados e edite somente os arquivos em:
- specs/uml/class
- specs/uml/sequence
- specs/uml/states

Torne os diagramas consistentes entre si e com os casos de uso.

Verifique obrigatoriamente:
1. nomes de classes e operações;
<!-- 2. estados WAITING, CALLED/IN_SERVICE e FINISHED; -->
3. ordem FIFO;
4. apenas uma senha atual;
5. comportamento quando não há senha aguardando;
6. comportamento quando não há atendimento para finalizar.

Não escreva código. Não altere os casos de uso para acomodar os diagramas. Ao final, liste as inconsistências corrigidas.
```

## Prompt 5 — Validação antes do código

```text
Considere a especificação UML como congelada.

Edite somente VALIDATION.md e arquivos em tests/.

Crie testes com o test runner nativo do Node.js, sem dependências externas. Os testes devem importar o futuro módulo ../src/domain.mjs e representar os critérios de aceitação AC-01 a AC-07.

Os testes devem falhar neste momento porque a implementação ainda não existe. Não crie nem altere arquivos em src/. Não reduza os critérios para facilitar a implementação.

Ao final, informe quais casos de uso e regras de negócio cada teste cobre.
```

## Prompt 6 — Implementação do domínio

```text
Implemente somente src/domain.mjs.

Use como contrato:
- PROJECT.md;
- PROTOCOL.md;
- specs/uml/userCases;
- specs/uml/class;
- specs/uml/states;
- VALIDATION.md;
- tests/.

Implemente TicketStatus, Ticket e QueueService/QueueManager conforme os diagramas. Não implemente DOM, HTML ou CSS. Não adicione bibliotecas nem altere testes ou especificações.

Execute node --test tests/*.test.mjs. Se um teste revelar contradição na especificação, pare e informe; não escolha silenciosamente uma interpretação.
```

## Prompt 7 — Interface e integração

```text
Implemente a interface nos arquivos src/index.html, src/styles.css e src/app.mjs.

Não altere src/domain.mjs, testes ou documentação.

A interface deve permitir executar UC-01, UC-02, UC-03 e visualizar UC-04. Use somente APIs do navegador e os métodos públicos definidos no diagrama de classes. Mostre mensagens compreensíveis para os fluxos alternativos, mas não acrescente funcionalidades.

Ao final:
1. execute os testes;
2. informe o comando para iniciar o servidor estático;
3. forneça um checklist manual curto, sem reproduzir arquivos completos no chat.
```

## Prompt 8 — Revisão e correção limitada

```text
Faça a revisão final do projeto contra PROJECT.md, VALIDATION.md e todos os diagramas UML.

Execute os testes e examine os arquivos em src/. Você pode corrigir somente violações objetivas da especificação ou defeitos que impeçam os critérios de aceitação.

Não altere a especificação, não adicione funcionalidades, não adicione dependências e não faça uma reformulação visual ampla.

Ao final, apresente:
- testes executados e resultado;
- violações encontradas;
- arquivos modificados;
- requisitos que continuam dependentes de validação manual.
```

## Controle de consumo

- Não peça que o agente repita o conteúdo lido.
- Não envie todos os documentos pelo chat; referencie os arquivos.
- Uma etapa não deve corrigir artefatos pertencentes a outra etapa.
- Se uma chamada falhar, corrija o prompt antes de repeti-la.
- Use o diff como saída principal e peça resumos curtos.

