# DIFC AI Landing Page Generator

An AI-powered landing page generator that transforms campaign context into responsive, SEO-first, brand-compliant landing pages using an agentic workflow.

## 🎯 Features

- **AI-Powered Generation**: Uses Ollama (local LLM) for all AI tasks - no API keys required
- **Data-Driven**: Analyzes historical campaign data and A/B test results
- **Brand Compliant**: Ensures DIFC brand guidelines compliance
- **Section-by-Section Control**: Generate and refine individual sections
- **SEO Optimized**: Built-in SEO analysis and optimization
- **Responsive Design**: Mobile-first, accessible components
- **Deployment Ready**: Export to Vercel, Azure, or Sitecore BYOC

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- Ollama installed and running locally
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Verify Ollama models (you already have models installed)
ollama list
# Available models: mistral:latest, phi3:latest, llama3.1:8b
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
# Ollama Configuration (Local - No API Key Required)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral
# Available models: mistral, phi3, llama3.1:8b

# Application Configuration
NODE_ENV=development
PORT=3000
API_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

```bash
# Start all services (web + API)
npm run dev

# Or start individually
npm run dev:web    # Next.js frontend on http://localhost:3000
npm run dev:api    # Express API on http://localhost:3001
```

## 📁 Project Structure

```
ai-landing-generator/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express backend
├── packages/
│   ├── shared/       # Shared utilities
│   ├── ui/           # Shared UI components
│   └── types/        # TypeScript types
├── agents/           # AI Agent definitions
├── mcp-servers/      # MCP servers
├── templates/        # Landing page templates
├── data/             # Sample data
└── docs/             # Documentation
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+, React 18+, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **AI/LLM**: Ollama (local), LangChain, LangGraph
- **Data**: Zod (validation), PapaParse (CSV)
- **Testing**: Vitest, Playwright

## 📝 License

MIT - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📚 Documentation

- [Architecture Overview](docs/architecture/overview.md)
- [API Endpoints](docs/api/endpoints.md)
- [Setup Guide](docs/user-guide/setup.md)

