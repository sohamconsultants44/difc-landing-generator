# API Endpoints

## Base URL
`http://localhost:3001`

## Endpoints

### Health Check
```
GET /health
```
Returns API status.

### Generate Landing Page
```
POST /api/generate
```
Generates a landing page based on campaign input.

**Request Body:**
```json
{
  "campaignObjective": "lead-gen",
  "primaryConversionKPI": "...",
  "targetAudience": "...",
  // ... see CampaignInput type
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "sections": [...],
    "formSchema": {...},
    "explanation": {...}
  }
}
```

### Campaigns
```
GET /api/campaigns
GET /api/campaigns/:id
```

### Experiments
```
GET /api/experiments
```

### Insights
```
GET /api/insights
```

### Brand Guidelines
```
GET /api/brand-guidelines
```

