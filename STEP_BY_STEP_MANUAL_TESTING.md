# Step-by-Step Manual Testing Guide

## ✅ Step 1: API Server Status - COMPLETE

**What I checked:**
- ✅ Browser: http://localhost:3001/
- ✅ Browser shows API endpoints list

**Expected Output (What you should see):**
```json
{
  "message": "DIFC AI Landing Page Generator API",
  "version": "1.0.0",
  "endpoints": {
    "templates": "/api/templates",
    "explanation": "/api/explanation",
    ...
  }
}
```

**✅ Status:** Working correctly!

---

## ✅ Step 2: Templates API - List Templates - COMPLETE

**What I checked:**
- ✅ Browser: http://localhost:3001/api/templates
- ✅ Browser shows empty template list

**Expected Output (What you should see):**
```json
{
  "templates": [],
  "metadata": {
    "totalTemplates": 0,
    "lastUpdated": "2025-11-20T10:03:44.533Z",
    "categories": ["lead-gen", "sales", "signup"]
  }
}
```

**✅ Status:** Working correctly! (Empty array is expected - no templates created yet)

---

## 📋 Step 3: Create Your First Template - MANUAL TEST REQUIRED

**What YOU need to check:**

### Option A: Using Browser Console (Easiest)
1. Open browser: http://localhost:3001/api/templates
2. Press F12 to open DevTools
3. Go to Console tab
4. Paste this code:

```javascript
fetch('http://localhost:3001/api/templates/from-campaign', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    campaignInput: {
      campaignObjective: "lead-gen",
      primaryConversionKPI: "5% sign-ups",
      targetAudience: "B2B SaaS companies",
      buyerPersonaKeywords: ["enterprise", "saas"],
      productServiceName: "AI Landing Page Generator",
      primaryOffer: "Free trial",
      uniqueValueProposition: "AI-powered landing pages",
      top3To5Benefits: ["Fast", "Easy", "Effective"],
      featureList: ["AI generation"],
      emotionalTriggers: ["trust"],
      objectionsToOvercome: ["cost"],
      testimonials: [],
      trustIndicators: [],
      primaryCTAText: "Start Free Trial",
      formFields: [],
      targetSEOKeywords: ["landing page"],
      privacyPolicyURL: "https://example.com/privacy",
      gdprCCPAConsentText: "I agree"
    },
    templateName: "My First Template"
  })
})
.then(r => r.json())
.then(data => console.log('Success:', data))
.catch(e => console.error('Error:', e));
```

**Expected Output:**
```json
{
  "success": true,
  "template": {
    "templateID": "template-...",
    "templateName": "My First Template",
    "templateVersion": "1.0.0",
    ...
  },
  "message": "Template created from campaign input"
}
```

### Option B: Using Postman/Thunder Client
- Method: POST
- URL: http://localhost:3001/api/templates/from-campaign
- Headers: `Content-Type: application/json`
- Body: Use the JSON from Option A

**What to verify:**
- ✅ Status code: 201 (Created)
- ✅ Response has `success: true`
- ✅ Response has `template` object with `templateID`

---

## 📋 Step 4: Verify Template Was Created - MANUAL TEST REQUIRED

**What YOU need to check:**

1. Open browser: http://localhost:3001/api/templates
2. Refresh the page

**Expected Output:**
```json
{
  "templates": [
    {
      "templateID": "template-...",
      "templateName": "My First Template",
      ...
    }
  ],
  "metadata": {
    "totalTemplates": 1,
    ...
  }
}
```

**What to verify:**
- ✅ `totalTemplates` is now 1 (was 0 before)
- ✅ `templates` array has 1 item
- ✅ Template has the name you gave it

---

## 📋 Step 5: Test Explanation API - MANUAL TEST REQUIRED

**What YOU need to check:**

### Using Browser Console - FIXED VERSION:
**Paste this ENTIRE block:**

```javascript
(async function() {
  try {
    const response = await fetch('http://localhost:3001/api/explanation/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        campaignInput: {
          campaignObjective: "lead-gen",
          productServiceName: "Test Product",
          targetAudience: "Test Audience"
        },
        generatedPage: {},
        designDecisions: [{
          section: "Hero",
          element: "CTA Button",
          decision: "Place CTA above the fold",
          rationale: "Based on A/B test results showing 23% higher conversion",
          dataSource: "Experiment EXP-2024-CTA-001"
        }]
      })
    });
    const data = await response.json();
    console.log('Report:', data);
    window.explanationReport = data.report;
    console.log('Report saved to window.explanationReport');
  } catch (e) {
    console.error('Error:', e);
  }
})();
```

**Expected Output:**
```json
{
  "success": true,
  "report": {
    "campaignName": "Test Product",
    "generatedAt": "2025-...",
    "decisions": [...],
    "dataUsageSummary": {
      "campaignFieldsUsed": ["Conversion Rate", "Bounce Rate", ...],
      "experimentResultsUsed": ["CTA Position Tests", ...],
      "insightsGenerated": [...],
      "assumptions": [...]
    },
    "overallRationale": "..."
  }
}
```

**What to verify:**
- ✅ Status code: 200
- ✅ `success: true`
- ✅ `report` object exists
- ✅ `dataUsageSummary` has arrays
- ✅ `overallRationale` has text (may take a moment if using Ollama)

---

## 📋 Step 6: Generate PDF - MANUAL TEST REQUIRED

**What YOU need to check:**

### Using Browser Console (after Step 5) - FIXED VERSION:
**Paste this ENTIRE block:**

```javascript
(async function() {
  try {
    if (!window.explanationReport) {
      console.error('Please run Step 5 first!');
      return;
    }
    const response = await fetch('http://localhost:3001/api/explanation/pdf', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({report: window.explanationReport})
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'explanation.pdf';
    a.click();
    console.log('PDF downloaded!');
  } catch (e) {
    console.error('Error:', e);
  }
})();
```

**Expected Output:**
- ✅ PDF file downloads automatically
- ✅ File name: `explanation-*.pdf`
- ✅ File opens and shows explanation report

**What to verify:**
- ✅ PDF file is created
- ✅ PDF contains the explanation report content
- ✅ PDF has proper formatting

---

## 🔍 Browser Error Checking

**What YOU need to check manually:**

1. **Open Browser DevTools (F12)**
2. **Console Tab:**
   - Look for red error messages
   - Should be empty (no errors)

3. **Network Tab:**
   - Make API requests
   - Check each request:
     - Status: Should be 200 or 201
     - Response: Should show JSON data
     - No red errors

4. **Check Browser Console for JavaScript Errors:**
   - Open: http://localhost:3000 (frontend)
   - Press F12
   - Check Console tab for errors

---

## ✅ Summary Checklist

- [x] Step 1: API Server - ✅ Working
- [x] Step 2: Templates List - ✅ Working  
- [ ] Step 3: Create Template - **YOU TEST THIS**
- [ ] Step 4: Verify Template - **YOU TEST THIS**
- [ ] Step 5: Generate Explanation - **YOU TEST THIS**
- [ ] Step 6: Generate PDF - **YOU TEST THIS**
- [ ] Browser Console Errors - **YOU CHECK THIS**

---

## 🆘 If Something Doesn't Work

1. **Check server is running:**
   - http://localhost:3001/health should return `{"status":"ok"}`

2. **Check browser console:**
   - F12 → Console tab
   - Look for error messages

3. **Check network tab:**
   - F12 → Network tab
   - Make request
   - Check status code and response

4. **Common issues:**
   - Server not running → Restart: `cd apps/api && npm run dev`
   - CORS error → Server should handle this automatically
   - 404 error → Check URL is correct

---

## 📝 Next Steps After Testing

Once all steps work:
1. ✅ Templates API is working
2. ✅ Explanation API is working  
3. ✅ PDF generation is working
4. Ready to integrate with frontend!

