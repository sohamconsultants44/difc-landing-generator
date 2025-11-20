# Test 2 Troubleshooting Guide

## ✅ What Was Fixed

### 1. **Added Timeouts**
   - **LLM Service**: Each LLM call now has a 30-second timeout
   - **Generate Route**: Overall request timeout of 4 minutes
   - **Better Error Messages**: Clear timeout messages with troubleshooting tips

### 2. **Added Ollama Health Check**
   - New endpoint: `GET /health/ollama`
   - Tests if Ollama is accessible and responding
   - Quick 5-second test to verify connectivity

### 3. **Improved Test Suite**
   - Progress indicators show elapsed time
   - Better error messages
   - Ollama connection test added

---

## 🔍 Why Test 2 Failed

Test 2 timed out after 3 minutes. This can happen because:

1. **Ollama is not running** - The LLM service can't connect
2. **Ollama is slow** - Each LLM call takes longer than expected
3. **Model not loaded** - Ollama needs to load the model first (first call is slower)
4. **Network issues** - Connection between API and Ollama is blocked

---

## ✅ How to Fix

### Step 1: Check Ollama Status

Run in terminal:
```bash
ollama list
```

**Expected output:**
```
NAME              ID              SIZE      MODIFIED    
mistral:latest    6577803aa9a0    4.4 GB    12 days ago
```

If you see models listed, Ollama is installed. If not, install Ollama.

### Step 2: Start Ollama Server

If Ollama is not running, start it:
```bash
ollama serve
```

**Keep this terminal open!** Ollama needs to be running.

### Step 3: Test Ollama Connection

In the test suite page, click **"Check Ollama"** button (new test in Section 1).

Or test manually:
```bash
curl http://localhost:11434/api/tags
```

Should return JSON with available models.

### Step 4: Check API Server Logs

Look at the terminal where you ran `npm run dev` in `apps/api`.

You should see logs like:
```
[Generate] Starting generation request...
[Generate] Input validated, starting workflow...
```

If you see errors, they'll tell you what's wrong.

### Step 5: Try Test 2 Again

1. Make sure Ollama is running (`ollama serve`)
2. Make sure API server is running (`npm run dev` in `apps/api`)
3. Refresh test suite page
4. Click "Check Ollama" first (should pass)
5. Then try "Run Generation Test" again

---

## 🐛 Common Issues

### Issue: "LLM request timed out"

**Cause:** Ollama is not responding or is too slow

**Fix:**
1. Check if Ollama is running: `ollama list`
2. Restart Ollama: Stop `ollama serve`, then start again
3. Try a smaller model: Set `OLLAMA_MODEL=phi3` in `.env`

### Issue: "Failed to connect to Ollama"

**Cause:** Ollama server is not running

**Fix:**
1. Start Ollama: `ollama serve`
2. Verify it's running: `curl http://localhost:11434/api/tags`

### Issue: "Request timeout" after 4 minutes

**Cause:** The workflow is taking too long (6+ LLM calls × 30s each = 3+ minutes)

**Fix:**
1. This is normal for first run (model loading)
2. Wait for it to complete
3. Subsequent runs should be faster
4. Check API server logs to see which step is slow

### Issue: Test passes Ollama check but generation still fails

**Cause:** Ollama works but is very slow, or one step is hanging

**Fix:**
1. Check API server logs - see which step is slow
2. Try restarting Ollama
3. Check system resources (CPU/RAM usage)

---

## 📊 Expected Behavior

### Normal Test 2 Execution:

1. **0-10s**: Request sent, validation passed
2. **10-40s**: Step 1 - Campaign Analysis (LLM call)
3. **40-70s**: Step 2 - Content Generation (LLM call)
4. **70-100s**: Step 3 - Design Generation (LLM call)
5. **100-130s**: Step 4 - SEO Optimization (LLM call)
6. **130-160s**: Step 5 - Form Building (LLM call)
7. **160-190s**: Step 6 - Explanation Generation (LLM call)
8. **190s+**: Response returned

**Total: 2-3 minutes is normal**

### First Run:
- May take 4-5 minutes (model loading)
- Subsequent runs: 2-3 minutes

---

## ✅ Quick Verification

Run these commands to verify everything is working:

```bash
# 1. Check Ollama
ollama list

# 2. Test Ollama API
curl http://localhost:11434/api/tags

# 3. Test API health
curl http://localhost:3001/health

# 4. Test Ollama health check
curl http://localhost:3001/health/ollama
```

All should return success responses.

---

## 🎯 Next Steps

1. **Restart API server** (to pick up new timeout code):
   ```bash
   cd apps/api
   npm run dev
   ```

2. **Refresh test suite page** in browser

3. **Run "Check Ollama" test first** - Should pass if Ollama is running

4. **Then try Test 2 again** - Should work with better timeout handling

---

## 📝 Notes

- **Timeouts are now in place** - Requests won't hang forever
- **Better error messages** - Will tell you exactly what's wrong
- **Ollama health check** - Quick way to verify Ollama is working
- **Progress indicators** - See how long each step takes

If Test 2 still fails after following these steps, check the API server logs for specific error messages.

