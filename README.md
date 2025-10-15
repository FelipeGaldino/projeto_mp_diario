# Projeto MP Diário

Sistema de busca e análise do Diário Oficial do Ministério Público de Mato Grosso.

## 🚀 Deploy Automático no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages. A cada push na branch `main`, o site será automaticamente atualizado.

### 📋 Pré-requisitos

1. **Repositório no GitHub**: Certifique-se de que o repositório está no GitHub
2. **GitHub Pages habilitado**: Vá em Settings > Pages e configure:
   - Source: GitHub Actions
   - Branch: gh-pages (será criada automaticamente)

### 🔧 Configuração

O projeto já está configurado com:

- ✅ **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
- ✅ **Configuração do Vite** para GitHub Pages
- ✅ **Scripts de build** no package.json
- ✅ **Arquivo .nojekyll** para compatibilidade

### 🚀 Como funciona

1. **Push para main**: Faça push das suas alterações para a branch `main`
2. **Build automático**: O GitHub Actions irá:
   - Instalar dependências
   - Fazer build do projeto React
   - Deployar para GitHub Pages
3. **Site atualizado**: O site estará disponível em `https://[seu-usuario].github.io/projeto_mp_diario/`

### 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
cd frontend
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### 📁 Estrutura do Projeto

```
projeto_mp_diario/
├── .github/workflows/     # GitHub Actions
├── frontend/              # Aplicação React
│   ├── src/              # Código fonte
│   ├── build/            # Build de produção
│   └── package.json      # Dependências e scripts
├── json_data/            # Dados extraídos
└── README.md
```

### 🔗 Links

- **Site**: https://[seu-usuario].github.io/projeto_mp_diario/
- **Fonte**: https://www.mpmt.mp.br/diario-oficial/
