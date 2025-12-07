# How to Install Node.js and npm on Windows

## ❌ Current Issue
```
npm : The term 'npm' is not recognized...
```

This means Node.js and npm are not installed on your Windows system.

---

## ✅ Solution: Install Node.js

### Method 1: Official Installer (Recommended)

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the **LTS version** (Long Term Support)
   - Choose the Windows Installer (.msi) - 64-bit

2. **Run the Installer**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - Accept the license agreement
   - Keep default installation path: `C:\Program Files\nodejs\`
   - Make sure "Add to PATH" is checked ✅
   - Click "Install"

3. **Restart Your Terminal**
   - Close all PowerShell/CMD windows
   - Open a new terminal
   - This ensures PATH changes take effect

4. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```
   
   You should see version numbers like:
   ```
   v20.x.x
   10.x.x
   ```

---

### Method 2: Using Chocolatey (Package Manager)

If you have Chocolatey installed:

```powershell
# Run as Administrator
choco install nodejs-lts
```

---

### Method 3: Using Winget (Windows Package Manager)

If you have Windows 10/11 with winget:

```powershell
winget install OpenJS.NodeJS.LTS
```

---

## 🔧 After Installation

### 1. Verify Installation
```bash
node --version
npm --version
```

### 2. Navigate to Your Project
```bash
cd path\to\lawyerbhai
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Or use the batch file:
```bash
run-dev.bat
```

---

## 🐛 Troubleshooting

### Issue: "npm still not recognized after installation"

**Solution 1: Restart Computer**
- Sometimes Windows needs a full restart to recognize PATH changes

**Solution 2: Manually Add to PATH**
1. Search for "Environment Variables" in Windows
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button
4. Under "System variables", find "Path"
5. Click "Edit"
6. Add these paths if missing:
   ```
   C:\Program Files\nodejs\
   C:\Users\YourUsername\AppData\Roaming\npm
   ```
7. Click OK and restart terminal

**Solution 3: Check Installation Location**
```bash
where node
where npm
```

This shows where Node.js is installed.

---

## 📦 Recommended Node.js Version

For this project, use:
- **Node.js**: v18.x or v20.x (LTS)
- **npm**: v9.x or v10.x (comes with Node.js)

---

## 🚀 Quick Start After Installation

```bash
# 1. Check versions
node --version
npm --version

# 2. Install project dependencies
npm install

# 3. Create .env file (if not exists)
copy .env.example .env

# 4. Add your API keys to .env

# 5. Run development server
npm run dev

# 6. Open browser
# Navigate to: http://localhost:5173
```

---

## 📝 Alternative: Use Node Version Manager (nvm-windows)

For managing multiple Node.js versions:

1. **Download nvm-windows**
   - Visit: https://github.com/coreybutler/nvm-windows/releases
   - Download `nvm-setup.exe`

2. **Install nvm**
   - Run the installer
   - Follow the wizard

3. **Install Node.js via nvm**
   ```bash
   nvm install lts
   nvm use lts
   ```

4. **Verify**
   ```bash
   node --version
   npm --version
   ```

---

## ✅ Expected Output After Successful Installation

```bash
C:\lawyerbhai> node --version
v20.10.0

C:\lawyerbhai> npm --version
10.2.3

C:\lawyerbhai> npm install
added 234 packages in 15s

C:\lawyerbhai> npm run dev

  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## 🎯 Next Steps After Installation

1. ✅ Install Node.js
2. ✅ Verify with `node --version` and `npm --version`
3. ✅ Run `npm install` in project directory
4. ✅ Create/update `.env` file with API keys
5. ✅ Run `npm run dev`
6. ✅ Open http://localhost:5173 in browser
7. ✅ Test the platform!

---

## 📞 Still Having Issues?

### Check These:
- [ ] Node.js installer completed successfully
- [ ] Terminal was restarted after installation
- [ ] PATH environment variable includes Node.js
- [ ] No antivirus blocking the installation
- [ ] Running terminal as Administrator (if needed)

### Get Help:
- Node.js Official Docs: https://nodejs.org/en/docs/
- npm Documentation: https://docs.npmjs.com/

---

**Once Node.js is installed, you'll be able to run the LawyerBhai platform!** 🚀

Last Updated: December 8, 2024
