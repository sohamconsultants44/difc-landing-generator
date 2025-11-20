# ⚡ Quick Setup: Cloud LLM (Much Faster Than Ollama)

## 🎯 Why Switch?

- **Ollama**: 20-60 seconds per generation ❌
- **Cloud LLM**: 1-3 seconds per generation ✅
- **Result**: **10-20x faster** for competition!

## 🚀 Fastest Option: Google Gemini (FREE)

### Step 1: Get API Key (2 minutes)
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

### Step 2: Add to .env
```env
LLM_PROVIDER=gemini
GEMINI_API_KEY=your-api-key-here
```

### Step 3: Restart API Server
```bash
cd apps/api
npm run dev
```

**Done!** Generation will now be **5-10 seconds** instead of 60-120 seconds! 🎉

---

## 🥈 Alternative: OpenAI (Fast & Reliable)

### Step 1: Get API Key
1. Go to: https://platform.openai.com/api-keys
2. Sign up (free $5 credit)
3. Create API key
4. Copy the key

### Step 2: Add to .env
```env
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-your-api-key-here
```

### Step 3: Restart API Server
```bash
cd apps/api
npm run dev
```

---

## 🥉 Alternative: Mock Provider (Instant, For Demo)

Perfect for competition demo when you need **guaranteed speed**:

### Step 1: Add to .env
```env
LLM_PROVIDER=mock
```

### Step 2: Restart API Server
```bash
cd apps/api
npm run dev
```

**Result**: **Instant** responses (< 1 second)! Perfect for demo.

---

## 📊 Speed Comparison

| Provider | Generation Time | Cost | Best For |
|----------|----------------|------|----------|
| **Mock** | < 1s | FREE | Demo |
| **Gemini** | 5-10s | FREE | Competition ⭐ |
| **OpenAI** | 5-15s | $5 free | Competition |
| **Ollama** | 60-120s | FREE | Local dev |

## ✅ Recommendation

**For Competition**: Use **Gemini** (free, fast, reliable)
**For Demo**: Use **Mock** (instant, no API needed)

## 🔄 Switch Back to Ollama

If you want to use Ollama again:
```env
LLM_PROVIDER=ollama
# or just remove LLM_PROVIDER line
```

---

## 🎯 Test It

1. Set up provider (see above)
2. Restart API server
3. Open: http://localhost:3000/test-suite.html
4. Run Test 2 - should be **10-20x faster**! ⚡

