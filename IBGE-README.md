# Integração IBGE - Estados Brasileiros

Esta implementação adiciona uma integração simples com a API pública do IBGE para consultar informações sobre os estados brasileiros.

## 🚀 Funcionalidades Implementadas

### 🔧 Backend (MCP Server)

1. **Tool: `LIST_BRAZILIAN_STATES`**
   - Consulta a API pública do IBGE: `/api/v1/localidades/estados`
   - Retorna lista completa de estados com: id, nome, sigla e região
   - Inclui tratamento de erros e validação de dados
   - Ordenação alfabética por nome do estado

2. **Workflow: `FETCH_BRAZILIAN_STATES_WORKFLOW`**
   - Orquestra a busca de estados brasileiros
   - Processa os dados retornados
   - Inclui summary com estatísticas regionais
   - Observabilidade através do dashboard Deco

3. **View: Estados Brasileiros - IBGE**
   - Interface acessível através do painel Deco
   - URL: `/estados-ibge`
   - Ícone: `map`

### 🎨 Frontend (React)

1. **Componente: `BrazilianStates`**
   - Dashboard interativo com cards de estatísticas
   - Filtro por região e busca por nome/sigla
   - Grid responsivo com informações dos estados
   - Botão de atualização manual
   - Estados de loading, sucesso e erro

2. **Hooks: `useListBrazilianStates` e `useFetchBrazilianStatesWorkflow`**
   - Cache inteligente (1 hora) para dados dos estados
   - Invalidação automática após workflow
   - Feedback visual via toasts
   - Tratamento de erros

3. **Rota: `/estados-ibge`**
   - Página dedicada para visualização dos estados
   - Layout responsivo e acessível
   - Integração com sistema de roteamento existente

## 📁 Arquivos Implementados/Modificados

### Backend
- `server/tools.ts` - Adicionada tool `createListBrazilianStatesTool`
- `server/workflows.ts` - Adicionado workflow `createFetchBrazilianStatesWorkflow`
- `server/views.ts` - Adicionada view "Estados Brasileiros - IBGE"

### Frontend
- `view/src/components/brazilian-states.tsx` - Componente principal
- `view/src/routes/estados.tsx` - Nova rota para estados
- `view/src/lib/hooks.ts` - Hooks para integração IBGE
- `view/src/routes/home.tsx` - Link para nova funcionalidade

## 🧪 Como Testar

### 1. Executar o Projeto
```bash
# Instalar dependências (se necessário)
npm install

# Gerar tipos TypeScript
npm run gen

# Iniciar desenvolvimento
npm run dev
```

### 2. Acessar a Interface
- **Frontend**: http://localhost:4000
- **Estados IBGE**: http://localhost:4000/estados-ibge
- **Dashboard Deco**: Através do túnel fornecido no console

### 3. Testar Funcionalidades

#### Na Página Principal (http://localhost:4000)
- Procurar pelo botão "Ver Estados Brasileiros (IBGE)" no rodapé
- Clicar para navegar para a página de estados

#### Na Página de Estados (http://localhost:4000/estados-ibge)
- **Visualização**: Lista completa de 27 estados brasileiros
- **Estatísticas**: Cards com total de estados, regiões, filtros ativos
- **Busca**: Campo de texto para buscar por nome ou sigla
- **Filtro**: Dropdown para filtrar por região (Norte, Nordeste, etc.)
- **Atualização**: Botão "Atualizar" para recarregar dados
- **Responsividade**: Testar em diferentes tamanhos de tela

### 4. Testar Tool Diretamente
No console do dashboard Deco, você pode executar:
```javascript
// Buscar todos os estados
LIST_BRAZILIAN_STATES({})

// Executar workflow completo
FETCH_BRAZILIAN_STATES_WORKFLOW({})
```

## 🔍 Validações e Testes

### Cenários de Sucesso
- ✅ Carregamento inicial dos 27 estados brasileiros
- ✅ Filtro por região (5 regiões disponíveis)
- ✅ Busca por nome (ex: "São Paulo", "Rio de Janeiro")
- ✅ Busca por sigla (ex: "SP", "RJ", "MG")
- ✅ Atualização manual via botão
- ✅ Responsividade em mobile e desktop

### Cenários de Erro
- ✅ Falha na API do IBGE (timeout, 404, etc.)
- ✅ Dados inválidos ou malformados
- ✅ Problemas de conectividade
- ✅ Estados de loading durante requisições

### Performance
- ✅ Cache de 1 hora para dados dos estados
- ✅ Busca e filtros são locais (sem novas requisições)
- ✅ Lazy loading de componentes
- ✅ Otimização de re-renders

## 🌐 API IBGE Utilizada

**Endpoint**: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`

**Estrutura de Resposta**:
```json
[
  {
    "id": 11,
    "nome": "Rondônia",
    "sigla": "RO",
    "regiao": {
      "id": 1,
      "nome": "Norte",
      "sigla": "N"
    }
  }
]
```

**Características**:
- ✅ API pública (sem necessidade de autenticação)
- ✅ Dados oficiais e atualizados
- ✅ Resposta JSON estruturada
- ✅ Baixa latência e alta disponibilidade

## 📊 Estrutura de Dados

### Estados (27 total)
- **Regiões**: Norte (7), Nordeste (9), Centro-Oeste (3), Sudeste (4), Sul (3)
- **Campos**: ID único, Nome completo, Sigla (2 letras), Região

### Estatísticas Exibidas
- Total de estados
- Número de regiões
- Estados filtrados atualmente
- Região selecionada no filtro

## 🎯 Próximas Melhorias (Sugestões)

1. **Dados Adicionais**
   - Integração com API de municípios por estado
   - Dados populacionais e econômicos
   - Informações geográficas (área, limites)

2. **Visualizações**
   - Mapas interativos do Brasil
   - Gráficos de distribuição por região
   - Comparações entre estados

3. **Funcionalidades**
   - Favoritar estados
   - Histórico de consultas
   - Exportação de dados (CSV, JSON)

4. **Performance**
   - Service Worker para cache offline
   - Paginação para grandes volumes
   - Virtualização de listas

## 🔧 Troubleshooting

### Erro "Cannot find module"
```bash
# Regenerar tipos
npm run gen
```

### Tool não aparece no client
```bash
# Verificar se foi adicionada ao array exports
# Em server/tools.ts, verificar se createListBrazilianStatesTool está no array tools
```

### Página não carrega
```bash
# Verificar se a rota foi registrada corretamente
# Confirmar que o servidor de desenvolvimento está rodando
```

### API IBGE não responde
- Verificar conectividade com internet
- Testar endpoint diretamente no browser
- Aguardar alguns minutos (possível instabilidade temporária)

---

**Desenvolvido com**: Deco Platform, React, TypeScript, Tailwind CSS, TanStack Query
**API**: Instituto Brasileiro de Geografia e Estatística (IBGE)
