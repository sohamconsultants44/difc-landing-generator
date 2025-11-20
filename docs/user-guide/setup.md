# Setup Guide

## Prerequisites

1. **Node.js 20+** - [Download](https://nodejs.org/)
2. **Ollama** - [Download](https://ollama.ai)
3. **npm** or **yarn**

## Installation Steps

### 1. Install Ollama Models

```bash
# Pull required models
ollama pull llama3.2
# or
ollama pull mistral
```

### 2. Install Dependencies

```bash
# From project root
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2

# Application
NODE_ENV=development
PORT=3000
API_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:web  # Frontend on http://localhost:3000
npm run dev:api  # Backend on http://localhost:3001
```

### 5. Verify Installation

1. Open http://localhost:3000 in your browser
2. Check API health: http://localhost:3001/health
3. Verify Ollama is running: `ollama list`

## Troubleshooting

### Ollama Connection Issues
- Ensure Ollama is running: `ollama serve`
- Check OLLAMA_BASE_URL in .env matches your Ollama setup
- Verify model is installed: `ollama list`

### Port Already in Use
- Change PORT or API_PORT in .env
- Or stop the process using the port

### Module Not Found Errors
- Run `npm install` from project root
- Ensure you're using Node.js 20+

