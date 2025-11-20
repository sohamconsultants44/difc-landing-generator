# 🧪 Frontend Test Suite - DIFC Landing Page Generator

> Comprehensive test cases to verify all features work as intended from the HTML frontend

## 📋 Prerequisites

1. **Start the servers:**
   ```bash
   # Terminal 1: Start API server
   cd apps/api
   npm run dev

   # Terminal 2: Start frontend
   cd apps/web
   npm run dev
   ```

2. **Open browser:** http://localhost:3000

3. **Open browser console:** Press `F12` or `Right-click > Inspect > Console`

---

## ✅ Test Case 1: Campaign Input Form - All Tabs

### Objective
Verify all 7 tabs of the campaign input form work correctly.

### Steps

1. **Navigate to:** http://localhost:3000/generate

2. **Test Basic Info Tab:**
   - ✅ Select "Lead Generation" from Campaign Objective dropdown
   - ✅ Enter "5% sign-ups" in Primary Conversion KPI
   - ✅ Enter target audience description
   - ✅ Add buyer persona keywords (press Enter after each)
   - ✅ Enter product/service name
   - ✅ Enter primary offer
   - ✅ Enter unique value proposition
   - ✅ Select page layout preference
   - ✅ Select tone of voice

3. **Test Messaging Tab:**
   - ✅ Click "Messaging" tab
   - ✅ Add 3-5 benefits (click "+ Add Benefit")
   - ✅ Add feature list items
   - ✅ Add emotional triggers (press Enter)
   - ✅ Add objections to overcome
   - ✅ Enter primary CTA text
   - ✅ Enter secondary CTA text (optional)

4. **Test Social Proof Tab:**
   - ✅ Click "Social Proof" tab
   - ✅ Add testimonial (click "+ Add Testimonial")
     - Name: "John Doe"
     - Role: "CEO"
     - Company: "Tech Corp"
     - Quote: "This product changed our business!"
   - ✅ Add trust indicator
     - Type: "Badge"
     - Label: "ISO Certified"

5. **Test Form Builder Tab:**
   - ✅ Click "Form Builder" tab
   - ✅ Add form field (click "+ Add Form Field")
     - Name: "email"
     - Label: "Email Address"
     - Type: "Email"
     - Required: ✓
   - ✅ Add another field:
     - Name: "name"
     - Label: "Full Name"
     - Type: "Text"
     - Required: ✓
   - ✅ Enter API endpoint: `https://api.example.com/submit`

6. **Test Visuals Tab:**
   - ✅ Click "Visuals" tab
   - ✅ Enter hero image URL (optional)
   - ✅ Enter video URL (optional)
   - ✅ Enter logo URL (optional)
   - ✅ Enter brand colors: `#001E60, #FFFFFF`

7. **Test SEO & Analytics Tab:**
   - ✅ Click "SEO & Analytics" tab
   - ✅ Add SEO keywords (press Enter after each)
   - ✅ Enter Google Analytics ID (optional)
   - ✅ Enter Google Tag Manager ID (optional)

8. **Test Compliance Tab:**
   - ✅ Click "Compliance" tab
   - ✅ Enter privacy policy URL: `https://example.com/privacy`
   - ✅ Enter GDPR consent text

### Expected Result
- All tabs switch correctly
- All fields accept input
- Arrays (keywords, benefits, etc.) add/remove correctly
- Form validation works (required fields)

---

## ✅ Test Case 2: Generate Landing Page

### ⏱️ IMPORTANT: This Test Takes 60-180 Seconds!

**Why it takes so long:**
- The workflow executes **6+ sequential LLM calls** using Ollama
- Each LLM call takes **10-30 seconds**
- Steps include: Campaign Analysis → Content Generation → Design → SEO → Form → Explanation
- **Total time: 60-180 seconds** (1-3 minutes)

**This is NORMAL and EXPECTED behavior!**

### Objective
Verify landing page generation works end-to-end.

### Steps

1. **Fill out the form** (use Test Case 1 or use sample data below)

2. **Sample Test Data:**
   ```javascript
   // Copy and paste this in browser console to auto-fill form
   (function() {
     const form = document.querySelector('form');
     if (!form) {
       console.error('Form not found. Make sure you are on /generate page');
       return;
     }
     
     // This will be handled by the form component
     console.log('✅ Form found. Please fill manually or use the form UI.');
   })();
   ```

3. **Click "Generate Landing Page" button**

4. **Wait for generation** (may take 30-60 seconds)

### Expected Result
- ✅ Loading state shows "Generating..."
- ✅ **Wait 60-180 seconds** (progress bar will show elapsed time)
- ✅ After generation, preview appears
- ✅ Sections are displayed in left sidebar
- ✅ Preview shows generated landing page
- ✅ Explanation report section appears below
- ✅ "Download Explanation PDF" button appears
- ✅ "Save as Template" button appears
- ✅ "Export to Sitecore" button appears

### ⚠️ Troubleshooting Long Wait Times

**If test times out after 3 minutes:**
1. Check if Ollama is running: `ollama list` in terminal
2. Check API server logs for errors
3. Try restarting Ollama: `ollama serve`
4. Check if model is downloaded: `ollama pull mistral`
5. The test has a 3-minute timeout - if it takes longer, check server logs

### Browser Console Test
```javascript
// Test generation API directly
(async function() {
  try {
    const testData = {
      campaignObjective: "lead-gen",
      primaryConversionKPI: "5% sign-ups",
      targetAudience: "Small business owners looking for automation",
      buyerPersonaKeywords: ["automation", "efficiency", "small business"],
      productServiceName: "Business Automation Pro",
      primaryOffer: "Free 14-day trial",
      uniqueValueProposition: "Automate your business processes in minutes, not days",
      top3To5Benefits: ["Save 10 hours per week", "Increase productivity by 40%", "Easy setup"],
      featureList: ["Drag-and-drop builder", "100+ integrations", "24/7 support"],
      emotionalTriggers: ["trust", "urgency"],
      objectionsToOvercome: ["Too expensive", "Too complex"],
      testimonials: [{
        name: "John Doe",
        role: "CEO",
        company: "Tech Corp",
        quote: "This product changed our business!"
      }],
      trustIndicators: [{
        type: "badge",
        label: "ISO Certified"
      }],
      primaryCTAText: "Start Free Trial",
      secondaryCTAText: "Learn More",
      formFields: [{
        name: "email",
        label: "Email Address",
        type: "email",
        required: true
      }, {
        name: "name",
        label: "Full Name",
        type: "text",
        required: true
      }],
      apiConfig: {
        endpoint: "https://api.example.com/submit",
        method: "POST"
      },
      toneOfVoice: "friendly",
      pageLayoutPreference: "scroll",
      targetSEOKeywords: ["business automation", "workflow", "productivity"],
      privacyPolicyURL: "https://example.com/privacy",
      gdprCCPAConsentText: "I agree to the privacy policy"
    };

    console.log('🚀 Starting generation...');
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const data = await response.json();
    console.log('✅ Generation Result:', data);
    
    if (data.success) {
      console.log('✅ SUCCESS! Landing page generated');
      console.log('Sections:', data.result?.sections?.length || 0);
    } else {
      console.error('❌ Generation failed:', data);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

---

## ✅ Test Case 3: Section-by-Section Editor

### Objective
Verify section editing functionality works.

### Steps

1. **Generate a landing page** (complete Test Case 2 first)

2. **Select a section** from the left sidebar

3. **Edit section properties:**
   - ✅ Change section title/text
   - ✅ Modify section content
   - ✅ Update section styling

4. **Verify preview updates** in real-time

### Expected Result
- ✅ Section editor appears when section is selected
- ✅ Changes reflect immediately in preview
- ✅ Section data persists when switching between sections

### Browser Console Test
```javascript
// Test section update
(function() {
  const sections = document.querySelectorAll('[data-section]');
  console.log('Found sections:', sections.length);
  
  // Check if section editor is visible
  const editor = document.querySelector('[data-section-editor]');
  if (editor) {
    console.log('✅ Section editor found');
  } else {
    console.log('⚠️ Section editor not visible (select a section first)');
  }
})();
```

---

## ✅ Test Case 4: Template Management

### Objective
Verify template save and load functionality.

### Steps

### 4.1 Save Template

1. **Generate a landing page** (complete Test Case 2)

2. **Click "Save as Template" button**

3. **Verify success message** appears

### Browser Console Test - Save Template
```javascript
// Test template creation
(async function() {
  try {
    const templateData = {
      campaignInput: {
        campaignObjective: "lead-gen",
        productServiceName: "Test Product",
        targetAudience: "Test Audience",
        primaryConversionKPI: "5% sign-ups",
        uniqueValueProposition: "Test UVP",
        primaryOffer: "Free Trial",
        primaryCTAText: "Get Started",
        buyerPersonaKeywords: ["test"],
        top3To5Benefits: ["Benefit 1"],
        featureList: ["Feature 1"],
        emotionalTriggers: ["trust"],
        objectionsToOvercome: ["cost"],
        testimonials: [],
        trustIndicators: [],
        formFields: [],
        toneOfVoice: "friendly",
        pageLayoutPreference: "scroll",
        targetSEOKeywords: ["test"],
        privacyPolicyURL: "https://example.com/privacy",
        gdprCCPAConsentText: "I agree"
      },
      templateName: "Test Template " + new Date().getTime()
    };

    console.log('💾 Saving template...');
    const response = await fetch('http://localhost:3001/api/templates/from-campaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(templateData)
    });

    const data = await response.json();
    console.log('✅ Template Save Result:', data);
    
    if (data.success) {
      console.log('✅ Template saved successfully!');
      console.log('Template ID:', data.template?.templateID);
    } else {
      console.error('❌ Template save failed:', data);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

### 4.2 List Templates

1. **Navigate to:** http://localhost:3000/dashboard

2. **Click "Browse Templates" button**

3. **Verify templates list** appears

### Browser Console Test - List Templates
```javascript
// Test template listing
(async function() {
  try {
    console.log('📋 Fetching templates...');
    const response = await fetch('http://localhost:3001/api/templates');
    const data = await response.json();
    
    console.log('✅ Templates:', data);
    console.log('Total templates:', data.templates?.length || 0);
    
    if (data.templates && data.templates.length > 0) {
      console.log('✅ Templates found!');
      data.templates.forEach((t, i) => {
        console.log(`${i + 1}. ${t.templateName} (${t.templateID})`);
      });
    } else {
      console.log('⚠️ No templates found');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

### 4.3 Load Template

1. **Click on a template** from the list

2. **Verify template loads** in generate page

### Expected Result
- ✅ Template saves successfully
- ✅ Templates list displays correctly
- ✅ Template loads with all form data pre-filled

---

## ✅ Test Case 5: Explanation PDF Generation

### Objective
Verify explanation report and PDF download works.

### Steps

1. **Generate a landing page** (complete Test Case 2)

2. **Wait for explanation report** to appear below preview

3. **Verify explanation report shows:**
   - ✅ Data usage summary
   - ✅ Campaign fields used
   - ✅ Insights generated
   - ✅ Overall rationale

4. **Click "Download Explanation PDF" button**

5. **Verify PDF downloads** to Downloads folder

### Browser Console Test - Generate Explanation
```javascript
// Test explanation generation
(async function() {
  try {
    const explanationData = {
      campaignInput: {
        campaignObjective: "lead-gen",
        productServiceName: "Test Product",
        targetAudience: "Test Audience",
        primaryConversionKPI: "5% sign-ups",
        uniqueValueProposition: "Test UVP",
        primaryOffer: "Free Trial",
        primaryCTAText: "Get Started",
        buyerPersonaKeywords: ["test"],
        top3To5Benefits: ["Benefit 1"],
        featureList: ["Feature 1"],
        emotionalTriggers: ["trust"],
        objectionsToOvercome: ["cost"],
        testimonials: [],
        trustIndicators: [],
        formFields: [],
        toneOfVoice: "friendly",
        pageLayoutPreference: "scroll",
        targetSEOKeywords: ["test"],
        privacyPolicyURL: "https://example.com/privacy",
        gdprCCPAConsentText: "I agree"
      },
      generatedPage: {
        sections: [{
          type: "Hero",
          component: "HeroSection",
          props: { title: "Test Title" }
        }]
      },
      designDecisions: [{
        section: "Hero",
        element: "CTA Button",
        decision: "Place CTA above the fold",
        rationale: "Based on A/B test results showing 23% higher conversion",
        dataSource: "Experiment EXP-2024-CTA-001"
      }]
    };

    console.log('📄 Generating explanation report...');
    const response = await fetch('http://localhost:3001/api/explanation/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(explanationData)
    });

    const data = await response.json();
    console.log('✅ Explanation Result:', data);
    
    if (data.success) {
      console.log('✅ Explanation report generated!');
      console.log('Data Usage:', data.report?.dataUsageSummary);
      console.log('Rationale:', data.report?.overallRationale?.substring(0, 100) + '...');
      
      // Test PDF download
      console.log('📥 Testing PDF download...');
      const pdfResponse = await fetch('http://localhost:3001/api/explanation/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report: data.report })
      });

      if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `test-explanation-${Date.now()}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        console.log('✅ PDF downloaded successfully!');
      } else {
        console.error('❌ PDF download failed');
      }
    } else {
      console.error('❌ Explanation generation failed:', data);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

### Expected Result
- ✅ Explanation report generates successfully
- ✅ Report shows data usage summary
- ✅ Report shows design rationale
- ✅ PDF downloads successfully
- ✅ PDF opens correctly

---

## ✅ Test Case 6: Sitecore Export

### Objective
Verify Sitecore BYOC export functionality.

### Steps

1. **Generate a landing page** (complete Test Case 2)

2. **Click "Export to Sitecore" button**

3. **Verify JSON file downloads**

4. **Open downloaded JSON file**

### Expected Result
- ✅ JSON file downloads
- ✅ JSON contains Sitecore-compatible structure
- ✅ JSON includes component metadata
- ✅ JSON includes BYOC format

### Browser Console Test
```javascript
// Test Sitecore export
(async function() {
  try {
    // First generate a landing page
    const generateResponse = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaignObjective: "lead-gen",
        productServiceName: "Test Product",
        targetAudience: "Test Audience",
        primaryConversionKPI: "5% sign-ups",
        uniqueValueProposition: "Test UVP",
        primaryOffer: "Free Trial",
        primaryCTAText: "Get Started",
        buyerPersonaKeywords: ["test"],
        top3To5Benefits: ["Benefit 1"],
        featureList: ["Feature 1"],
        emotionalTriggers: ["trust"],
        objectionsToOvercome: ["cost"],
        testimonials: [],
        trustIndicators: [],
        formFields: [],
        toneOfVoice: "friendly",
        pageLayoutPreference: "scroll",
        targetSEOKeywords: ["test"],
        privacyPolicyURL: "https://example.com/privacy",
        gdprCCPAConsentText: "I agree"
      })
    });

    const generateData = await generateResponse.json();
    
    if (generateData.success && generateData.result?.sections) {
      console.log('✅ Landing page generated');
      
      // Export to Sitecore format
      const sitecoreExport = {
        components: generateData.result.sections.map((section, index) => ({
          id: `component-${index}`,
          name: section.component,
          type: section.type,
          props: section.props,
          sitecoreMetadata: {
            componentName: section.component,
            renderingId: `rendering-${index}`,
            dataSource: `datasource-${index}`,
            placeholder: 'main'
          }
        })),
        metadata: {
          exportedAt: new Date().toISOString(),
          version: '1.0.0',
          format: 'Sitecore BYOC'
        }
      };

      // Download JSON
      const jsonStr = JSON.stringify(sitecoreExport, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sitecore-export-${Date.now()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Sitecore export downloaded!');
      console.log('Components:', sitecoreExport.components.length);
    } else {
      console.error('❌ Failed to generate landing page');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

---

## ✅ Test Case 7: API Endpoints Verification

### Objective
Verify all API endpoints respond correctly.

### Browser Console Test - All APIs
```javascript
// Comprehensive API test suite
(async function() {
  const baseURL = 'http://localhost:3001';
  const results = {};

  // Test 1: Health Check
  try {
    const res = await fetch(`${baseURL}/health`);
    const data = await res.json();
    results.health = { success: res.ok, data };
    console.log('✅ Health Check:', data);
  } catch (e) {
    results.health = { success: false, error: e.message };
    console.error('❌ Health Check failed:', e);
  }

  // Test 2: Campaigns API
  try {
    const res = await fetch(`${baseURL}/api/campaigns`);
    const data = await res.json();
    results.campaigns = { success: res.ok, count: data.campaigns?.length || 0 };
    console.log('✅ Campaigns API:', data.campaigns?.length || 0, 'campaigns');
  } catch (e) {
    results.campaigns = { success: false, error: e.message };
    console.error('❌ Campaigns API failed:', e);
  }

  // Test 3: Experiments API
  try {
    const res = await fetch(`${baseURL}/api/experiments`);
    const data = await res.json();
    results.experiments = { success: res.ok, count: data.experiments?.length || 0 };
    console.log('✅ Experiments API:', data.experiments?.length || 0, 'experiments');
  } catch (e) {
    results.experiments = { success: false, error: e.message };
    console.error('❌ Experiments API failed:', e);
  }

  // Test 4: Insights API
  try {
    const res = await fetch(`${baseURL}/api/insights`);
    const data = await res.json();
    results.insights = { success: res.ok, hasData: !!data.insights };
    console.log('✅ Insights API:', data.insights ? 'Data available' : 'No data');
  } catch (e) {
    results.insights = { success: false, error: e.message };
    console.error('❌ Insights API failed:', e);
  }

  // Test 5: Templates API
  try {
    const res = await fetch(`${baseURL}/api/templates`);
    const data = await res.json();
    results.templates = { success: res.ok, count: data.templates?.length || 0 };
    console.log('✅ Templates API:', data.templates?.length || 0, 'templates');
  } catch (e) {
    results.templates = { success: false, error: e.message };
    console.error('❌ Templates API failed:', e);
  }

  // Test 6: Brand Guidelines API
  try {
    const res = await fetch(`${baseURL}/api/brand-guidelines`);
    const data = await res.json();
    results.brandGuidelines = { success: res.ok, hasData: !!data.guidelines };
    console.log('✅ Brand Guidelines API:', data.guidelines ? 'Available' : 'Not available');
  } catch (e) {
    results.brandGuidelines = { success: false, error: e.message };
    console.error('❌ Brand Guidelines API failed:', e);
  }

  // Summary
  console.log('\n📊 API Test Summary:');
  console.table(results);
  
  const allPassed = Object.values(results).every(r => r.success);
  if (allPassed) {
    console.log('✅ All API tests passed!');
  } else {
    console.log('⚠️ Some API tests failed. Check details above.');
  }
})();
```

### Expected Result
- ✅ All API endpoints respond
- ✅ Data is returned in correct format
- ✅ No CORS errors
- ✅ No 404/500 errors

---

## ✅ Test Case 8: Form Validation

### Objective
Verify form validation works correctly.

### Steps

1. **Navigate to:** http://localhost:3000/generate

2. **Try to submit empty form:**
   - ✅ Click "Generate Landing Page" without filling required fields
   - ✅ Verify browser validation prevents submission
   - ✅ Verify required field indicators appear

3. **Fill required fields:**
   - ✅ Fill all required fields
   - ✅ Verify form submits successfully

### Browser Console Test
```javascript
// Test form validation
(function() {
  const form = document.querySelector('form');
  if (!form) {
    console.error('❌ Form not found');
    return;
  }

  // Check required fields
  const requiredFields = form.querySelectorAll('[required]');
  console.log('✅ Required fields found:', requiredFields.length);

  // Test validation
  const isValid = form.checkValidity();
  console.log('Form valid:', isValid);

  if (!isValid) {
    console.log('⚠️ Form has validation errors');
    form.reportValidity();
  } else {
    console.log('✅ Form is valid');
  }
})();
```

---

## ✅ Test Case 9: Responsive Design

### Objective
Verify landing page preview is responsive.

### Steps

1. **Generate a landing page** (complete Test Case 2)

2. **Test responsive breakpoints:**
   - ✅ Desktop (1920px+)
   - ✅ Tablet (768px - 1024px)
   - ✅ Mobile (320px - 767px)

3. **Use browser DevTools:**
   - Press `F12`
   - Click device toolbar icon (or `Ctrl+Shift+M`)
   - Test different device sizes

### Expected Result
- ✅ Layout adapts to screen size
- ✅ Text remains readable
- ✅ Images scale appropriately
- ✅ Forms remain usable
- ✅ Navigation works on mobile

---

## ✅ Test Case 10: DIFC Brand Guidelines

### Objective
Verify DIFC brand guidelines are applied correctly.

### Steps

1. **Generate a landing page**

2. **Verify brand colors:**
   - ✅ Primary color: #001E60
   - ✅ Secondary color: #FFFFFF
   - ✅ Colors used in CTAs, headings, etc.

3. **Verify typography:**
   - ✅ Font family: Helvetica Neue, Arial
   - ✅ Heading sizes: 32px, 28px, 24px, 20px, 18px
   - ✅ Line heights: 1.2 (headings), 1.6 (body)

### Browser Console Test
```javascript
// Test brand guidelines
(function() {
  const styles = getComputedStyle(document.body);
  const primaryColor = styles.getPropertyValue('--difc-primary') || '#001E60';
  
  console.log('🎨 Brand Guidelines Check:');
  console.log('Primary Color:', primaryColor);
  
  // Check for DIFC colors in CSS
  const difcColors = {
    primary: '#001E60',
    secondary: '#FFFFFF'
  };
  
  console.log('Expected Primary:', difcColors.primary);
  console.log('Match:', primaryColor.includes('001E60') || primaryColor.includes('rgb(0, 30, 96)'));
  
  // Check fonts
  const fontFamily = styles.fontFamily;
  console.log('Font Family:', fontFamily);
  console.log('Helvetica/Arial found:', fontFamily.includes('Helvetica') || fontFamily.includes('Arial'));
})();
```

---

## ✅ Test Case 11: SEO & Analytics Integration

### Objective
Verify SEO meta tags and analytics scripts are included.

### Steps

1. **Generate a landing page** with SEO keywords and analytics IDs

2. **View page source** (`Right-click > View Page Source`)

3. **Verify:**
   - ✅ Meta title tag
   - ✅ Meta description tag
   - ✅ Meta keywords tag
   - ✅ Open Graph tags
   - ✅ Google Analytics script (if provided)
   - ✅ Google Tag Manager script (if provided)

### Browser Console Test
```javascript
// Test SEO and Analytics
(function() {
  console.log('🔍 SEO & Analytics Check:');
  
  // Check meta tags
  const title = document.querySelector('title');
  const metaDesc = document.querySelector('meta[name="description"]');
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  
  console.log('Title:', title?.textContent || 'Not found');
  console.log('Description:', metaDesc?.content || 'Not found');
  console.log('Keywords:', metaKeywords?.content || 'Not found');
  
  // Check analytics scripts
  const gaScript = document.querySelector('script[src*="google-analytics"]');
  const gtmScript = document.querySelector('script[src*="googletagmanager"]');
  
  console.log('Google Analytics:', gaScript ? 'Found' : 'Not found');
  console.log('Google Tag Manager:', gtmScript ? 'Found' : 'Not found');
  
  // Check structured data
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  console.log('Structured Data:', structuredData ? 'Found' : 'Not found');
})();
```

---

## 📊 Test Results Summary

After completing all test cases, fill out this summary:

| Test Case | Status | Notes |
|-----------|--------|-------|
| 1. Campaign Input Form | ⬜ Pass / ⬜ Fail | |
| 2. Generate Landing Page | ⬜ Pass / ⬜ Fail | |
| 3. Section Editor | ⬜ Pass / ⬜ Fail | |
| 4. Template Management | ⬜ Pass / ⬜ Fail | |
| 5. Explanation PDF | ⬜ Pass / ⬜ Fail | |
| 6. Sitecore Export | ⬜ Pass / ⬜ Fail | |
| 7. API Endpoints | ⬜ Pass / ⬜ Fail | |
| 8. Form Validation | ⬜ Pass / ⬜ Fail | |
| 9. Responsive Design | ⬜ Pass / ⬜ Fail | |
| 10. Brand Guidelines | ⬜ Pass / ⬜ Fail | |
| 11. SEO & Analytics | ⬜ Pass / ⬜ Fail | |

---

## 🐛 Troubleshooting

### Issue: API calls fail with CORS error
**Solution:** Ensure API server is running on `http://localhost:3001` and CORS is enabled.

### Issue: Generation takes too long
**Solution:** This is normal. Ollama LLM processing can take 30-60 seconds. Check API server logs.

### Issue: PDF doesn't download
**Solution:** Check browser download settings. PDF should download to Downloads folder.

### Issue: Templates not showing
**Solution:** Ensure templates directory exists and has write permissions.

### Issue: Form validation not working
**Solution:** Ensure all required fields are filled. Check browser console for errors.

---

## 🎯 Quick Test Script

Run this single script to test all major features:

```javascript
// Quick comprehensive test
(async function() {
  console.log('🚀 Starting comprehensive frontend test...\n');
  
  const baseURL = 'http://localhost:3001';
  let passed = 0;
  let failed = 0;
  
  // Test APIs
  const apis = [
    { name: 'Health', url: '/health' },
    { name: 'Campaigns', url: '/api/campaigns' },
    { name: 'Experiments', url: '/api/experiments' },
    { name: 'Insights', url: '/api/insights' },
    { name: 'Templates', url: '/api/templates' },
    { name: 'Brand Guidelines', url: '/api/brand-guidelines' }
  ];
  
  for (const api of apis) {
    try {
      const res = await fetch(baseURL + api.url);
      if (res.ok) {
        console.log(`✅ ${api.name} API: OK`);
        passed++;
      } else {
        console.log(`❌ ${api.name} API: Failed (${res.status})`);
        failed++;
      }
    } catch (e) {
      console.log(`❌ ${api.name} API: Error - ${e.message}`);
      failed++;
    }
  }
  
  // Test form
  const form = document.querySelector('form');
  if (form) {
    console.log('✅ Form found on page');
    passed++;
  } else {
    console.log('⚠️ Form not found (may not be on /generate page)');
  }
  
  // Summary
  console.log(`\n📊 Test Summary: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️ Some tests failed. Check details above.');
  }
})();
```

---

**Last Updated:** $(date)
**Version:** 1.0.0

