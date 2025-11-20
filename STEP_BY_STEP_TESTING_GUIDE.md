# Step-by-Step Testing Guide

## ✅ Step 1: Verify API Server is Running

**What to check:**
- Open browser: http://localhost:3001/
- Or check: http://localhost:3001/health

**Expected Output:**
```json
{
  "message": "DIFC AI Landing Page Generator API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "api": "/api",
    "campaigns": "/api/campaigns",
    "experiments": "/api/experiments",
    "insights": "/api/insights",
    "brandGuidelines": "/api/brand-guidelines",
    "generate": "/api/generate (POST)",
    "templates": "/api/templates",
    "explanation": "/api/explanation"
  }
}
```

**✅ Status:** Server is running!

---

## 📋 Step 2: Test Templates API - List Templates

**What to check:**
- Open browser: http://localhost:3001/api/templates
- Or use: `GET http://localhost:3001/api/templates`

**Expected Output:**
```json
{
  "templates": [],
  "metadata": {
    "totalTemplates": 0,
    "lastUpdated": "2024-...",
    "categories": ["lead-gen", "sales", "signup"]
  }
}
```

**What this means:**
- Empty array is OK - no templates created yet
- Metadata shows template library structure is working

---

## 📋 Step 3: Test Templates API - Create Template

**What to check:**
- Use Postman, curl, or browser console
- POST request to: http://localhost:3001/api/templates/from-campaign

**Test Data:**
```json
{
  "campaignInput": {
    "campaignObjective": "lead-gen",
    "primaryConversionKPI": "5% sign-ups",
    "targetAudience": "B2B SaaS companies",
    "buyerPersonaKeywords": ["enterprise", "saas", "b2b"],
    "productServiceName": "AI Landing Page Generator",
    "primaryOffer": "Free trial",
    "uniqueValueProposition": "AI-powered landing pages",
    "top3To5Benefits": ["Fast", "Easy", "Effective"],
    "featureList": ["AI generation", "Templates"],
    "emotionalTriggers": ["trust", "urgency"],
    "objectionsToOvercome": ["cost", "complexity"],
    "testimonials": [],
    "trustIndicators": [],
    "primaryCTAText": "Start Free Trial",
    "formFields": [],
    "targetSEOKeywords": ["landing page", "ai"],
    "privacyPolicyURL": "https://example.com/privacy",
    "gdprCCPAConsentText": "I agree to the privacy policy"
  },
  "templateName": "Test Template"
}
```

**Expected Output:**
```json
{
  "success": true,
  "template": {
    "templateID": "template-...",
    "templateName": "Test Template",
    "templateVersion": "1.0.0",
    ...
  },
  "message": "Template created from campaign input"
}
```

---

## 📋 Step 4: Verify Template Was Created

**What to check:**
- Open browser: http://localhost:3001/api/templates
- Should now show 1 template in the list

**Expected Output:**
```json
{
  "templates": [
    {
      "templateID": "template-...",
      "templateName": "Test Template",
      ...
    }
  ],
  "metadata": {
    "totalTemplates": 1,
    ...
  }
}
```

---

## 📋 Step 5: Test Explanation API - Generate Report

**What to check:**
- POST request to: http://localhost:3001/api/explanation/generate

**Test Data:**
```json
{
  "campaignInput": {
    "campaignObjective": "lead-gen",
    "productServiceName": "Test Product",
    "targetAudience": "Test Audience"
  },
  "generatedPage": {},
  "designDecisions": [
    {
      "section": "Hero",
      "element": "CTA Button",
      "decision": "Place CTA above the fold",
      "rationale": "Based on A/B test results showing 23% higher conversion",
      "dataSource": "Experiment EXP-2024-CTA-001"
    }
  ]
}
```

**Expected Output:**
```json
{
  "success": true,
  "report": {
    "campaignName": "Test Product",
    "generatedAt": "2024-...",
    "decisions": [...],
    "dataUsageSummary": {
      "campaignFieldsUsed": [...],
      "experimentResultsUsed": [...],
      "insightsGenerated": [...],
      "assumptions": [...]
    },
    "overallRationale": "..."
  }
}
```

---

## 📋 Step 6: Test Explanation API - Generate PDF

**What to check:**
- POST request to: http://localhost:3001/api/explanation/pdf
- Use the report from Step 5

**Expected Output:**
- PDF file download
- Or PDF content in response

---

## 🔍 Manual Checks

### Browser Console Check:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for any JavaScript errors

### Network Tab Check:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Make API requests
4. Check response status codes (should be 200)
5. Check response content

---

## ❌ Common Issues

### Issue: "Cannot GET /api/templates"
**Solution:** Check if server is running on port 3001

### Issue: "Template not found"
**Solution:** Create a template first using POST /api/templates/from-campaign

### Issue: "PDF generation failed"
**Solution:** Check if pdfkit is installed: `npm list pdfkit`

---

## ✅ Success Criteria

- [ ] API server responds at http://localhost:3001/
- [ ] Templates API returns empty array initially
- [ ] Can create a template successfully
- [ ] Template appears in list after creation
- [ ] Explanation report generates successfully
- [ ] PDF generates successfully (or returns content)

