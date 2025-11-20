# 🚀 Quick Start Guide

## ✅ Current Status

### API Server (Port 3001)
- ✅ **Running** at http://localhost:3001
- ✅ Root endpoint: http://localhost:3001/
- ✅ Health check: http://localhost:3001/health
- ✅ API info: http://localhost:3001/api

### Web Server (Port 3000)
- ✅ **Running** at http://localhost:3000
- ✅ Home page with navigation
- ✅ Dashboard page
- ✅ Generate page

## 📍 Available Endpoints

### API Endpoints (http://localhost:3001)

1. **Root** - `GET /`
   - Shows API information and available endpoints

2. **Health Check** - `GET /health`
   - Returns: `{"status":"ok","message":"API is running"}`

3. **API Info** - `GET /api`
   - Returns API description

4. **Campaigns** - `GET /api/campaigns`
   - List all campaigns

5. **Experiments** - `GET /api/experiments`
   - List A/B test experiments

6. **Insights** - `GET /api/insights`
   - Get campaign insights

7. **Brand Guidelines** - `GET /api/brand-guidelines`
   - Get DIFC brand guidelines

8. **Generate Landing Page** - `POST /api/generate`
   - Generate a landing page from campaign input
   - Requires JSON body with campaign data

## 🎯 Quick Test

### Test API:
```bash
# Health check
curl http://localhost:3001/health

# Root endpoint
curl http://localhost:3001/

# Or visit in browser:
# http://localhost:3001
# http://localhost:3001/health
```

### Test Web:
```bash
# Visit in browser:
# http://localhost:3000
```

## 🔧 Troubleshooting

If servers aren't running:

```bash
# Start API server
cd apps/api
npm run dev

# Start Web server (in another terminal)
cd apps/web
npm run dev

# Or start both from root:
npm run dev
```

## 📝 Next Steps

1. Visit http://localhost:3000 to see the frontend
2. Visit http://localhost:3001 to see API information
3. Start building your landing pages!

