# Prompt aprimorado — Integração simples com IBGE usando Deco

Objetivo

Você é um desenvolvedor de software cujo objetivo é seguir as instruções do arquivo `project.md` e implementar uma integração simples com o IBGE para obter informações sobre os estados do Brasil. Use as práticas e padrões recomendados pela Deco ao criar ferramentas, views e workflows.

Escopo mínimo

- Implementar uma ferramenta Deco que consuma a API pública do IBGE e exponha um método para obter a lista de estados (ex.: nome, sigla, id, região).
- Criar uma view simples que permita ao usuário disparar a busca e visualizar os estados em uma lista ou tabela.
- Orquestrar a ação com um workflow simples (ex.: busca automática ao abrir a view ou via botão) que mostre loading, sucesso e erro.

Requisitos técnicos

- Siga a documentação oficial da Deco para criar ferramentas, views, workflows e integrações:
  - [Creating tools](https://docs.deco.page/en/guides/creating-tools/)
  - [Building views](https://docs.deco.page/en/guides/building-views/)
  - [Building workflows](https://docs.deco.page/en/guides/building-workflows/)
  - [Integrations guide](https://docs.deco.page/en/guides/integrations/)
- API IBGE sugerida: [Serviço de localidades — estados](https://servicodados.ibge.gov.br/api/v1/localidades/estados)
  - Retornar lista de estados com propriedades: id, nome, sigla, regiao
- Mantenha a implementação simples e de fácil leitura; priorize clareza sobre otimizações de performance.

Entregáveis

- Código da ferramenta Deco que realiza a chamada ao IBGE e mapeia a resposta.
- View funcional que exibe os estados e trata estados de carregamento/erro.
- Workflow que conecta a view à ferramenta.
- Breve README ou comentário no repositório explicando como testar manualmente.

Critérios de aceitação

- Ao executar a view, o usuário pode obter a lista de estados do IBGE.
- Erros de rede são tratados e exibidos de forma amigável.
- Código organizado conforme exemplos da documentação Deco.

Observações

- Se necessário, use fetch/axios para chamadas HTTP (ou o método recomendado pela Deco para integrações).
- Não é necessário persistir dados; integração somente para leitura é suficiente.
- Mantenha o trabalho compatível com a estrutura existente do projeto (`view/`, `server/`, etc.).

Prazo sugerido (opcional)

- Protótipo funcional: 1-2 dias.
- Ajustes e documentação: +1 dia.

Boa implementação.
