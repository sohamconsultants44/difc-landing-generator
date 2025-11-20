# 📦 Resource Links from Planning Document

## Available Resources

### 1. ✅ DIFC Brand Guidelines (Figma)
**Link:** https://www.figma.com/proto/GG1hZVG2vmMDa7o0t6xuzC/DIFC-Guidelines-Oct-2021?page-id=0%3A1&node-id=601-3812&viewport=254%2C48%2C0.33&scaling=min-zoom&starting-point-node-id=194%3A5764

**Status:** ✅ Accessible (Public Figma link)
**Contents:**
- Color palette (Primary: #001E60 Navy, #FFFFFF White)
- Typography standards (Helvetica Neue, Arial)
- Logo usage guidelines
- Tone of voice guidelines
- Brand imagery style
- Layout principles

**Action Required:** 
- Can be accessed directly in browser
- May need to extract additional details manually
- Current API already has basic brand guidelines implemented

---

### 2. 📊 Sample Campaign Dataset (SharePoint)
**Link:** https://ignyteme-my.sharepoint.com/:x:/g/personal/herman_ignyte_ae/IQDdUy3hrqztQpoD4099D54DAZUF5on2gNEjswm7CBKrKD0?rtime=BwGjIwMo3kg

**Status:** ⚠️ Requires Authentication (SharePoint)
**Expected Columns:**
- Date, Campaign Name, Campaign ID
- Landing Page URL/ID
- Traffic Source, UTM params
- Device Type, Creative details
- Sessions, Users, Bounce Rate
- Engagement Rate, Time on Page
- CTA Clicks, Form metrics
- Conversion Count/Rate
- Cost metrics (CPS, CPC, CAC)
- Funnel rates

**Action Required:**
- You need to download this CSV file manually (requires SharePoint login)
- Save it to: `data/campaigns/campaign-data.csv`
- The system will process it automatically once loaded

---

### 3. 🧪 Social Experiment Dataset (A/B Testing Results)
**Link:** https://ignyteme-my.sharepoint.com/:x:/g/personal/herman_ignyte_ae/EUVrwBt8VolLozn7N9mPNmUBGl-F1REZ6le0YPWcPADb9g?e=IyCBSW

**Status:** ⚠️ Requires Authentication (SharePoint)
**Expected Columns:**
- Experiment ID, Name
- Start/End dates
- Variant (A/B/C)
- Tested Element, Element Type
- Visitors, Conversions
- Conversion Rate, Confidence Level
- Winner flag
- Insights, Recommendations

**Action Required:**
- You need to download this CSV file manually (requires SharePoint login)
- Save it to: `data/experiments/ab-test-data.csv`
- The system will process it automatically once loaded

---

### 4. 📐 Reference Wireframe Layouts
**Status:** ⏳ To be provided
**Expected Contents:**
- Low-fidelity wireframes
- Section order best practices
- Content hierarchy examples
- Mobile-first layouts
- Form placement patterns

**Action Required:** Wait for wireframes to be provided

---

### 5. 🖼️ Image Dataset CSV
**Status:** ⏳ To be extracted
**Expected Columns:**
- Image ID, URL
- Section recommendation
- Alt text
- Dimensions
- Style tags
- Performance metrics

**Action Required:** Extract from campaign datasets or wait for separate file

---

## 📝 Next Steps

### Immediate Actions:
1. **Access Figma Guidelines** ✅
   - Visit the Figma link to review full brand guidelines
   - Extract any additional details not yet in the API

2. **Download Campaign Data** ⚠️
   - Log into SharePoint
   - Download the campaign dataset CSV
   - Place in `data/campaigns/campaign-data.csv`

3. **Download A/B Test Data** ⚠️
   - Log into SharePoint  
   - Download the experiment dataset CSV
   - Place in `data/experiments/ab-test-data.csv`

### After Downloading:
Once you have the CSV files, I can:
- Create data loading scripts
- Process and validate the data
- Populate the insights endpoint
- Test the full workflow with real data

---

## 🔗 Quick Access Links

- **Figma Guidelines:** [Open in Browser](https://www.figma.com/proto/GG1hZVG2vmMDa7o0t6xuzC/DIFC-Guidelines-Oct-2021?page-id=0%3A1&node-id=601-3812&viewport=254%2C48%2C0.33&scaling=min-zoom&starting-point-node-id=194%3A5764)
- **Campaign Dataset:** [SharePoint Link](https://ignyteme-my.sharepoint.com/:x:/g/personal/herman_ignyte_ae/IQDdUy3hrqztQpoD4099D54DAZUF5on2gNEjswm7CBKrKD0?rtime=BwGjIwMo3kg)
- **A/B Test Dataset:** [SharePoint Link](https://ignyteme-my.sharepoint.com/:x:/g/personal/herman_ignyte_ae/EUVrwBt8VolLozn7N9mPNmUBGl-F1REZ6le0YPWcPADb9g?e=IyCBSW)

