# Architecture Overview

## System Architecture

The DIFC AI Landing Page Generator is built as a monorepo with the following structure:

### Frontend (apps/web)
- **Next.js 14+** with App Router
- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** components (to be added)

### Backend (apps/api)
- **Express.js** API server
- **TypeScript** for type safety
- **LangChain/LangGraph** for AI orchestration
- **Ollama** for local LLM (no API keys required)

### AI Agents
Located in `apps/api/src/agents/`:
- Campaign Analyzer
- Brand Compliance
- SEO Optimizer
- Content Generator
- Design Generator
- Form Builder
- Explainer

### Workflow
The `LandingPageWorkflow` orchestrates all agents using LangGraph:
1. Analyze campaign data
2. Generate content
3. Generate design
4. Optimize SEO
5. Build form
6. Generate explanation

### MCP Servers
Located in `mcp-servers/`:
- Campaign Data Server
- Brand Guidelines Server
- Design System Server
- SEO Analyzer Server

### Shared Packages
- `packages/types` - TypeScript type definitions
- `packages/shared` - Shared utilities and validation
- `packages/ui` - Shared UI components

## Data Flow

1. User submits campaign input via frontend
2. API validates input using Zod schemas
3. Workflow executes agent pipeline
4. Agents use Ollama (local LLM) for generation
5. Components are generated and validated
6. Results returned to frontend for preview
7. Explanation report generated

## Technology Stack

- **LLM**: Ollama (local, no API keys)
- **Orchestration**: LangGraph
- **Validation**: Zod
- **Data Processing**: PapaParse (CSV)
- **Testing**: Vitest, Playwright

