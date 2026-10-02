<p align="center">
  <h1 align="center">📁 LinkDrive</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-purple?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-teal?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase" alt="Supabase">
</p>

<p align="center">
  <b>Uma aplicação web moderna para gestão, visualização e partilha inteligente de locais, rotas e ficheiros geolocalizados.</b>
</p>

---

## 📌 Índice / Navegação
* [Sobre o Projeto](#-sobre-o-projeto)
* [Documentação do Projeto](#-documentação-do-projeto)
* [Estrutura de Pastas](#-estrutura-de-pastas)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Pré-requisitos](#-pré-requisitos)
* [Instalação e Execução](#-instalação-e-execução)
* [Contribuição](#-contribuição)

---

## 🚀 Sobre o Projeto

O **LinkDrive** é uma solução web interativa focada na experiência do utilizador para gestão de dados baseados em localização e armazenamento dinâmico. Desenvolvido com tecnologias de ponta, garante alta performance, design responsivo e arquitetura limpa.

---

## 📚 Documentação do Projeto

O repositório conta com uma estrutura robusta de documentação técnica e de gestão localizada na pasta [`docs/`](./docs):

* **[Visão do Produto](./docs/visao-produto.md):** Alinhamento de objetivos, público-alvo e escopo geral da aplicação.
* **[Roadmap](./docs/roadmap.md):** Planeamento das fases de desenvolvimento, marcos e entregas futuras.
* **[Definição de Pronto (DoD)](./docs/definicao-de-pronto.md):** Critérios de qualidade e requisitos para considerar uma tarefa concluída.
* **[Métricas](./docs/metricas.md):** Indicadores de desempenho e acompanhamento do projeto.
* **[Riscos](./docs/riscos.md):** Mapeamento de potenciais entraves técnicos e de negócio com planos de mitigação.
* **[ADRs (Architecture Decision Records)](./docs/adr):** Registo de decisões arquiteturais importantes tomadas ao longo do projeto.
* **[Progresso](./docs/PROGRESSO.md):** Registo atualizado do estado de desenvolvimento e tarefas executadas.

---

## 📂 Estrutura de Pastas

Visão geral da árvore de diretórios do projeto base:

```text
linkdrive-base/
├── .github/          # Workflows de CI/CD (Actions) e Templates de Issues/PRs
├── docs/             # Documentação completa do projeto (ADRs, Roadmap, Riscos, etc.)
├── public/           # Ativos estáticos públicos
├── scripts/          # Scripts utilitários (seed, backlog, etc.)
├── src/              # Código fonte principal da aplicação React
├── supabase/         # Configurações e migrações do Supabase
├── .env.example      # Exemplo de variáveis de ambiente
├── index.html        # Ponto de entrada HTML
├── package.json      # Dependências e scripts do Node
├── postcss.config.js # Configuração do PostCSS
├── tailwind.config.js# Configuração do Tailwind CSS
└── vite.config.js    # Configuração do empacotador Vite
```

---

## 💻 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias principais:

* **[React](https://react.dev/)** - Biblioteca principal para construção da interface.
* **[Vite](https://vitejs.dev/)** - Empacotador e ambiente de desenvolvimento ultrarrápido.
* **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário para estilização.
* **[Supabase](https://supabase.com/)** - Backend as a Service (BaaS) open-source para base de dados e autenticação.
* **[GitHub Actions](https://github.com/features/actions)** - Automação de fluxos de CI e controlo de progresso.

---

## ⚙️ Pré-requisitos

Certifica-te de que tens instalado no teu sistema:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior recomendada)
* Gestor de pacotes `npm`

---

## 📦 Instalação e Execução

Segue os passos abaixo para configurar o projeto localmente:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/teu-utilizador/linkdrive-base.git
   cd linkdrive-base
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar as variáveis de ambiente:**
   Duplica o ficheiro `.env.example`, renomeia para `.env` e preenche com as tuas credenciais do Supabase.

4. **Executar o projeto em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Aceder à aplicação:**
   Abre o teu browser e navega para `http://localhost:5173` (ou a porta indicada no teu terminal).

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Consulta a nossa [Definição de Pronto](./docs/definicao-de-pronto.md) e os templates de Pull Request em `.github/` antes de submeter alterações.