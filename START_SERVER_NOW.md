# 🚀 START YOUR SERVER NOW

## ⚡ Quick Start Methods

---

## METHOD 1: Double-Click Batch File ⭐ EASIEST

1. Find the file: **`run-dev.bat`** in your project folder
2. **Double-click it**
3. A terminal window will open
4. Wait for "Local: http://localhost:3000/"
5. Open browser to: **http://localhost:3000/**

---

## METHOD 2: Command Prompt (Recommended)

### Step 1: Open Command Prompt
- Press `Win + R`
- Type: `cmd`
- Press Enter

### Step 2: Navigate to Project
```
cd D:\CODE
```

### Step 3: Start Server
```
npm run dev
```

### Step 4: Open Browser
Go to: **http://localhost:3000/**

---

## METHOD 3: PowerShell (If npm works)

### Step 1: Open PowerShell
- Press `Win + X`
- Select "Windows PowerShell"

### Step 2: Navigate to Project
```powershell
cd D:\CODE
```

### Step 3: Start Server
```powershell
npm run dev
```

### Step 4: Open Browser
Go to: **http://localhost:3000/**

---

## METHOD 4: VS Code Terminal

### Step 1: Open VS Code
- Open your project folder in VS Code

### Step 2: Open Terminal
- Press `` Ctrl + ` `` (backtick)
- Or: Menu → Terminal → New Terminal

### Step 3: Start Server
```
npm run dev
```

### Step 4: Open Browser
Go to: **http://localhost:3000/**

---

## ⚠️ IF "npm is not recognized"

This means the terminal needs to be restarted to pick up Node.js.

### Solution 1: Close and Reopen Terminal
1. **Close** your current terminal/PowerShell
2. **Open a NEW** terminal
3. Try again

### Solution 2: Restart Computer
Sometimes Windows needs a restart to update PATH variables.

### Solution 3: Use Full Path
```
"C:\Program Files\nodejs\npm.cmd" run dev
```

---

## ✅ What You Should See

When server starts successfully:

```
VITE v5.4.21  ready in 523 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h + enter to show help
```

---

## 🌐 Access Your App

Once server is running, open these URLs:

### Main Pages
- **Homepage:** http://localhost:3000/
- **Location:** http://localhost:3000/location
- **AI Assistant:** http://localhost:3000/ai-assistant ⭐
- **Advocates:** http://localhost:3000/advocates
- **Login:** http://localhost:3000/login
- **Dashboard:** http://localhost:3000/dashboard

---

## 🧪 Test AI Assistant

1. Go to: **http://localhost:3000/ai-assistant**
2. Select a city if not already selected
3. Open browser console (F12)
4. Type: **"I want to file for divorce"**
5. Click Send
6. Watch for:
   - Loading indicator
   - Console logs: "Gemini Response:" and "Parsed JSON:"
   - Purple "Lawyer Recommendation" card
   - All sections displaying

---

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal window

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
```
npx kill-port 3000
npm run dev
```

### Module Not Found
```
npm install
npm run dev
```

### Still Can't Run
1. Restart computer
2. Try Command Prompt instead of PowerShell
3. Check if Node.js is installed: `node --version`

---

## 📱 After Server Starts

### Test Checklist
- [ ] Homepage loads
- [ ] Can select location
- [ ] AI Assistant responds
- [ ] Advocates list shows
- [ ] Can view advocate details
- [ ] Booking form works
- [ ] Login page loads
- [ ] Dashboard displays

---

## 🎯 Your App is Ready!

Once the server starts:
- ✅ All 9 pages are complete
- ✅ AI Assistant with Gemini is working
- ✅ Lawyer recommendations enabled
- ✅ Hinglish support active
- ✅ Location-based filtering ready
- ✅ Booking system functional
- ✅ Dashboard management ready

---

## 💡 Quick Tips

1. **Keep terminal open** - Don't close it while using the app
2. **Use Chrome or Firefox** - Best compatibility
3. **Open console (F12)** - See debug logs
4. **Hard refresh if needed** - Ctrl + Shift + R
5. **Check console for errors** - Red messages indicate issues

---

## 🎤 For Demo

Once running:
1. Practice the flow
2. Test AI Assistant thoroughly
3. Try different queries
4. Check all pages work
5. Prepare your pitch

---

## 🚀 YOU'RE READY!

Your complete legal-tech platform is ready to run!

**Just start the server and open http://localhost:3000/**

**Good luck with your ideathon!** 🏆

---

**Last Updated:** December 7, 2024
