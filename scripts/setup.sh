#!/bin/bash

echo "🚀 Setting up DIFC AI Landing Page Generator..."

# Check Node.js version
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 20 ]; then
    echo "❌ Node.js 20+ is required. Current version: $(node -v)"
    exit 1
fi

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "⚠️  Ollama is not installed. Please install it from https://ollama.ai"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Pull Ollama models
echo "🤖 Pulling Ollama models..."
ollama pull llama3.2 || echo "⚠️  Failed to pull llama3.2, you can pull it manually later"
ollama pull mistral || echo "⚠️  Failed to pull mistral, you can pull it manually later"

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env and configure"
echo "2. Run 'npm run dev' to start development servers"

