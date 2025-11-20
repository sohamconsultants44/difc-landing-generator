# DIFC AI Landing Page Generator

AI-Powered Landing Page Generator for DIFC Competition - Create responsive, SEO-first, brand-compliant landing pages with data-driven insights.

[![GitHub](https://img.shields.io/github/license/sohamconsultants44/difc-landing-generator)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-green)](https://expressjs.com/)

## 🎯 Features

### ✅ Complete Campaign Input Form
- **30+ fields** organized in 7 intuitive tabs
- Campaign objective, KPIs, audience targeting
- Messaging, social proof, form builder
- Visuals, SEO, and compliance settings

### ✅ Section-by-Section Editor
- Edit individual landing page sections
- Real-time preview updates
- Modular component architecture

### ✅ Auto Form Builder
- Visual form builder with drag-and-drop
- API endpoint configuration
- Field validation and types
- GDPR/CCPA compliance

### ✅ Landing Page Preview
- Real-time preview of generated pages
- Responsive design testing
- Browser-like preview interface

### ✅ Template Management
- Save and reuse campaign templates
- Template browser with search
- Quick template loading

### ✅ Data-Driven Insights
- Campaign performance analysis
- Device-specific patterns
- Conversion benchmarks
- A/B test learnings

### ✅ Explanation PDF Generation
- Auto-generated design rationale
- Data usage summary
- Design decision mapping
- Professional PDF reports

### ✅ Sitecore BYOC Export
- Export components to Sitecore format
- JSON export ready for import
- BYOC-compatible structure

### ✅ SEO & Analytics Integration
- Meta tags and structured data
- Google Analytics ready
- Google Tag Manager ready
- SEO optimization

### ✅ DIFC Brand Guidelines
- Brand-compliant colors (#001E60, #FFFFFF)
- Helvetica Neue typography
- Consistent styling throughout

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Ollama (for local LLM) - [Install Ollama](https://ollama.ai)

### Installation

```bash
# Clone the repository
git clone https://github.com/sohamconsultants44/difc-landing-generator.git
cd difc-landing-generator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Load campaign data
npm run load-data

# Start development servers
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral

# API Port
API_PORT=3001

# Optional: Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
```

---

## 📖 Usage

### 1. Start the Application

```bash
# Terminal 1: Start API server
cd apps/api
npm run dev

# Terminal 2: Start Web server
cd apps/web
npm run dev
```

### 2. Access the Application

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001
- **API Health:** http://localhost:3001/health

### 3. Generate a Landing Page

1. Visit http://localhost:3000/generate
2. Fill out the campaign form (7 tabs)
3. Click "Generate Landing Page"
4. Edit sections as needed
5. Save as template or export to Sitecore

---

## 🏗️ Architecture

### Monorepo Structure

```
difc-landing-generator/
├── apps/
│   ├── api/          # Express.js API server
│   └── web/          # Next.js frontend
├── packages/
│   ├── shared/       # Shared schemas and types
│   ├── ui/           # Shared UI components
│   └── types/        # TypeScript types
├── data/             # Campaign and experiment data
├── scripts/          # Utility scripts
└── docs/             # Documentation
```

### Technology Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Express.js, TypeScript, Node.js
- **AI/LLM:** Ollama (local), LangChain, LangGraph
- **Data Processing:** xlsx, pdfjs-dist
- **PDF Generation:** PDFKit
- **Validation:** Zod
- **Testing:** Vitest, Playwright

---

## 📡 API Endpoints

### Campaigns
- `GET /api/campaigns` - List all campaigns
- `GET /api/campaigns/:id` - Get specific campaign

### Experiments
- `GET /api/experiments` - List all experiments
- `GET /api/experiments/:id` - Get specific experiment

### Insights
- `GET /api/insights` - Generate campaign insights

### Templates
- `GET /api/templates` - List all templates
- `GET /api/templates/:id` - Get specific template
- `POST /api/templates` - Create new template
- `POST /api/templates/from-campaign` - Create from campaign

### Generation
- `POST /api/generate` - Generate landing page

### Explanation
- `POST /api/explanation/generate` - Generate explanation report
- `POST /api/explanation/pdf` - Generate PDF

### Brand Guidelines
- `GET /api/brand-guidelines` - Get DIFC brand guidelines

---

## 🎨 Features in Detail

### Campaign Input Form

The form is organized into 7 tabs:

1. **Basic Info:** Campaign objective, KPIs, target audience, product details
2. **Messaging:** Benefits, features, emotional triggers, objections
3. **Social Proof:** Testimonials, trust indicators
4. **Form Builder:** Form fields, API configuration
5. **Visuals:** Images, videos, logo, brand colors
6. **SEO & Analytics:** Keywords, GA/GTM IDs
7. **Compliance:** Privacy policy, GDPR/CCPA text

### Section Editor

- Click on any section to edit
- Update properties in real-time
- See changes in preview immediately
- Export individual sections

### Template System

- Save successful campaigns as templates
- Browse and reuse templates
- Modify templates for new campaigns
- Share templates across teams

---

## 📊 Data Sources

The system uses:
- **Campaign Data:** 100+ historical campaigns
- **Experiment Data:** 25+ A/B test results
- **Brand Guidelines:** DIFC official guidelines

---

## 🔒 Security & Compliance

- GDPR/CCPA compliant forms
- Privacy policy integration
- Secure API endpoints
- Environment variable management
- No API keys required (uses local Ollama)

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Azure

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed Azure deployment instructions.

---

## 📝 Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [API Documentation](docs/api/endpoints.md)
- [Architecture Overview](docs/architecture/overview.md)
- [User Guide](docs/user-guide/setup.md)
- [Competition Requirements](docs/challenge-requirements.txt)

---

## 🎯 Competition Submission

### Repository
**GitHub:** https://github.com/sohamconsultants44/difc-landing-generator

### Deployed Application
**Live URL:** [To be added after deployment]

### Demo Video
**Video Link:** [To be added]

### Key Deliverables

✅ **Input Form Template (JSON)** - Reusable template schema  
✅ **Auto-Generated Explanation PDF** - Design rationale with data mapping  
✅ **Data Usage Summary** - Tracks which data was used  
✅ **Campaigns API Output** - Verified correct format  
✅ **Complete Frontend** - All features accessible via UI  
✅ **Sitecore BYOC Export** - Component export functionality  

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

---

## 📄 License

See [LICENSE](LICENSE) for license information.

---

## 🙏 Acknowledgments

- DIFC for the competition opportunity
- Ollama for local LLM capabilities
- Next.js and Express.js communities

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check documentation in `/docs` folder
- Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for deployment help

---

## 🎉 Status

**✅ Competition Ready!**

All features implemented and tested. Ready for deployment and submission.

---

**Built with ❤️ for DIFC Competition**
