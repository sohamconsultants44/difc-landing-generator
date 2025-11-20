# Simple Step-by-Step Testing Guide

## 🎯 ONE FILE - ALL STEPS

---

## ✅ STEP 1: Check API Server

**What to do:**
1. Open browser
2. Go to: `http://localhost:3001/`
3. You should see JSON with endpoints list

**Expected result:**
```json
{"message":"DIFC AI Landing Page Generator API","version":"1.0.0","endpoints":{...}}
```

**✅ If you see this, move to Step 2**

---

## ✅ STEP 2: Check Templates List

**What to do:**
1. In same browser, go to: `http://localhost:3001/api/templates`
2. You should see empty templates list

**Expected result:**
```json
{"templates":[],"metadata":{"totalTemplates":0,...}}
```

**✅ If you see this, move to Step 3**

---

## ✅ STEP 3: Create a Template

**What to do:**
1. Press **F12** to open DevTools
2. Click **Console** tab
3. Click in the input area at bottom (where you see `>`)
4. **Copy ONLY the code below** (don't copy the ```javascript part):

```javascript
fetch('http://localhost:3001/api/templates/from-campaign', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({campaignInput: {campaignObjective: "lead-gen", primaryConversionKPI: "5% sign-ups", targetAudience: "B2B SaaS companies", buyerPersonaKeywords: ["enterprise", "saas"], productServiceName: "AI Landing Page Generator", primaryOffer: "Free trial", uniqueValueProposition: "AI-powered landing pages", top3To5Benefits: ["Fast", "Easy", "Effective"], featureList: ["AI generation"], emotionalTriggers: ["trust"], objectionsToOvercome: ["cost"], testimonials: [], trustIndicators: [], primaryCTAText: "Start Free Trial", formFields: [], targetSEOKeywords: ["landing page"], privacyPolicyURL: "https://example.com/privacy", gdprCCPAConsentText: "I agree"}, templateName: "My First Template"})}).then(function(r) {return r.json();}).then(function(d) {console.log('SUCCESS:', d);}).catch(function(e) {console.error('ERROR:', e);});
```

5. **Paste** it (Ctrl+V)
6. Press **Enter** once
7. Wait 2-3 seconds

**Expected result in console:**
```
SUCCESS: {success: true, template: {...}, message: "Template created from campaign input"}
```

**✅ If you see "SUCCESS", move to Step 4**

---

## ✅ STEP 4: Verify Template Was Created

**What to do:**
1. Go back to browser tab
2. Go to: `http://localhost:3001/api/templates`
3. **Refresh the page** (F5)

**Expected result:**
```json
{"templates":[{"templateID":"template-...","templateName":"My First Template",...}],"metadata":{"totalTemplates":1,...}}
```

**What to check:**
- `totalTemplates` should be **1** (not 0)
- You should see your template in the list

**✅ If you see your template, move to Step 5**

---

## ✅ STEP 5: Generate Explanation Report

**What to do:**
1. Go back to **Console tab** (F12 → Console)
2. Click in the input area at bottom
3. **Copy ONLY the code below**:

```javascript
fetch('http://localhost:3001/api/explanation/generate', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({campaignInput: {campaignObjective: "lead-gen", productServiceName: "Test Product", targetAudience: "Test Audience"}, generatedPage: {}, designDecisions: [{section: "Hero", element: "CTA Button", decision: "Place CTA above the fold", rationale: "Based on A/B test results showing 23% higher conversion", dataSource: "Experiment EXP-2024-CTA-001"}]})}).then(function(r) {return r.json();}).then(function(d) {console.log('SUCCESS:', d); window.explanationReport = d.report; console.log('Report saved!');}).catch(function(e) {console.error('ERROR:', e);});
```

4. **Paste** it (Ctrl+V)
5. Press **Enter** once
6. Wait 5-10 seconds (it might take time)

**Expected result in console:**
```
SUCCESS: {success: true, report: {...}}
Report saved!
```

**What to check:**
- Should see `success: true`
- Should see `report` object
- Should see "Report saved!" message

**⏳ If you see `Promise {<pending>}`:**
- This is normal - wait 5-10 seconds
- The LLM is generating the rationale (may take time)
- You should see the result appear after a few seconds

**✅ If you see "SUCCESS", move to Step 6**

**Note:** If you get a 500 error, the server was just restarted with fixes. Try the code again - it should work now!

---

## ✅ STEP 6: Generate PDF

**What to do:**
1. Still in **Console tab**
2. Click in the input area at bottom
3. **Copy ONLY the code below**:

```javascript
fetch('http://localhost:3001/api/explanation/pdf', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({report: window.explanationReport})}).then(function(r) {return r.blob();}).then(function(blob) {var url = window.URL.createObjectURL(blob); var a = document.createElement('a'); a.href = url; a.download = 'explanation.pdf'; a.click(); console.log('PDF downloaded!');}).catch(function(e) {console.error('ERROR:', e);});
```

4. **Paste** it (Ctrl+V)
5. Press **Enter** once
6. Wait 2-3 seconds

**Expected result:**
- PDF file should **download automatically**
- File name: `explanation.pdf`
- Console shows: `PDF downloaded!`

**✅ If PDF downloads, ALL STEPS COMPLETE!**

---

## 🆘 Troubleshooting

### Error: `"" is not a function`
**Problem:** You copied the markdown code block markers (```javascript)
**Solution:** Copy ONLY the code, not the ```javascript part

### Error: `Failed to fetch`
**Problem:** Server not running
**Solution:** Check http://localhost:3001/health - should return `{"status":"ok"}`

### Error: `500 Internal Server Error`
**Problem:** Server error
**Solution:** Let me know and I'll fix it

### No response in console
**Problem:** Code not executed
**Solution:** Make sure you pressed Enter after pasting

---

## 📝 Quick Checklist

- [ ] Step 1: API server responds
- [ ] Step 2: Templates list shows empty array
- [ ] Step 3: Template created successfully
- [ ] Step 4: Template appears in list
- [ ] Step 5: Explanation report generated
- [ ] Step 6: PDF downloaded

---

## 🎯 That's It!

Follow these steps one by one. If you get stuck at any step, tell me which step and what error you see, and I'll help fix it!

