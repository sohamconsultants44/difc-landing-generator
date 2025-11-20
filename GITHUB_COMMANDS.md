# GitHub Setup - Copy These Commands

## Step 1: Create Repository on GitHub Website

1. Go to: https://github.com/new
2. Repository name: `difc-landing-generator`
3. Description: `AI-Powered Landing Page Generator for DIFC Competition`
4. Choose: **Public**
5. **DO NOT** check any boxes (README, .gitignore, license)
6. Click **"Create repository"**
7. **Copy the repository URL** (e.g., `https://github.com/YOUR_USERNAME/difc-landing-generator.git`)

---

## Step 2: Run These Commands

**Open PowerShell/Terminal in your project folder and run:**

```powershell
# Navigate to project (if not already there)
cd "D:\Cursor project\DIFC competation"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: DIFC AI Landing Page Generator - Competition submission"

# Add remote (REPLACE YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/difc-landing-generator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Authentication

**When you run `git push`, you'll be asked to login:**

### Option A: GitHub CLI (Recommended)
```powershell
# Install GitHub CLI
winget install GitHub.cli

# Login
gh auth login

# Then push again
git push -u origin main
```

### Option B: Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "DIFC Project"
4. Select scope: `repo` (check the box)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing:
   - Username: Your GitHub username
   - Password: Paste the token

---

## ✅ After Pushing

1. Refresh your GitHub repository page
2. You should see all your files
3. Copy the repository URL for submission

---

## 🆘 Troubleshooting

**Error: "remote origin already exists"**
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/difc-landing-generator.git
```

**Error: "Authentication failed"**
- Use Personal Access Token (see Option B above)

**Error: "Large files"**
- Check `.gitignore` is working
- Large files should be excluded automatically

