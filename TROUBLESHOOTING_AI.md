# 🔧 AI Assistant Troubleshooting Guide

## Issue: AI Not Responding or Not Showing Lawyer Recommendations

---

## ✅ Quick Fixes

### 1. Check Browser Console

Open browser console (F12) and look for errors:
- Red error messages
- "Gemini API Error"
- "Failed to analyze case"
- JSON parse errors

### 2. Verify Gemini API Key

Check `.env` file:
```
VITE_GEMINI_API_KEY=AIzaSyB704Qb9TcBaH14LOY0aWpMuBsmDn8AN58
```

Make sure:
- Key starts with `VITE_`
- No extra spaces
- No quotes around the key

### 3. Restart Development Server

```bash
# Stop the server (Ctrl + C)
# Then restart
npm run dev
```

### 4. Clear Browser Cache

- Press `Ctrl + Shift + Delete`
- Clear cache and cookies
- Reload page

---

## 🔍 Debugging Steps

### Step 1: Check Console Logs

The updated code now includes debug logs:
- "Gemini Response:" - Shows raw AI response
- "Parsed JSON:" - Shows parsed data

Look for these in browser console (F12 → Console tab)

### Step 2: Test with Simple Query

Try this exact query:
```
I want to file for divorce
```

Expected response should include:
- Case Type: Divorce
- Lawyer Type: Divorce Lawyer
- Why This Lawyer: (Hinglish explanation)
- Next Steps: (3 steps)
- Legal Options: (3 options)

### Step 3: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit a query
4. Look for API call to Gemini
5. Check if it returns 200 OK

---

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to analyze case"

**Cause:** Gemini API error or network issue

**Solution:**
1. Check internet connection
2. Verify API key is correct
3. Check if Gemini API is down
4. Try again after a few seconds

### Issue 2: Response but no lawyer recommendation

**Cause:** JSON parsing failed, using fallback

**Solution:**
- Check console for "Gemini Response" log
- If you see text but no JSON, the AI didn't format correctly
- The fallback should still show lawyer recommendations
- If fallback doesn't work, check code was updated correctly

### Issue 3: Blank response

**Cause:** JavaScript error or component not rendering

**Solution:**
1. Check browser console for errors
2. Verify all files were saved
3. Restart dev server
4. Clear browser cache

### Issue 4: Old response format (no new fields)

**Cause:** Browser cached old JavaScript

**Solution:**
1. Hard refresh: `Ctrl + Shift + R`
2. Clear cache
3. Restart server

---

## 📝 Manual Test

### Test the API Directly

Open browser console and run:

```javascript
// Test if Gemini is working
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: 'Hello, are you working?' }]
    }]
  })
})
.then(r => r.json())
.then(d => console.log(d))
.catch(e => console.error(e));
```

Replace `YOUR_API_KEY` with your actual key.

---

## 🔧 Code Verification

### Check gemini.js

File: `src/config/gemini.js`

Should have:
```javascript
export const analyzeLegalCase = async (userQuery, userCity) => {
  try {
    const prompt = getLegalConsultationPrompt(userQuery, userCity);
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('Gemini Response:', text); // This should appear in console
    
    // ... rest of code
```

### Check AIAssistantPage.jsx

File: `src/pages/AIAssistantPage.jsx`

Should have AnalysisResult component with:
```javascript
{analysis.lawyerType && (
  <div className="lawyer-recommendation">
    <h4>👨‍⚖️ Lawyer Recommendation</h4>
    <div className="lawyer-type-badge">{analysis.lawyerType}</div>
    {analysis.whyThisLawyer && (
      <p className="lawyer-reason">{analysis.whyThisLawyer}</p>
    )}
  </div>
)}
```

---

## ✅ Expected Behavior

### When Working Correctly

1. **User types query** → "I want to file for divorce"
2. **Loading indicator** → Shows "Analyzing with Gemini AI..."
3. **Console logs** → Shows "Gemini Response:" and "Parsed JSON:"
4. **Response displays** with:
   - Case Type badge
   - **Lawyer Recommendation card (purple)** ⭐
   - Legal Advice
   - Next Steps (blue)
   - Important Points
   - Documents Required
   - Legal Options (green)
   - Possible Risks (red)
   - Timeline
   - LawyerBhai Help (blue)
   - "Find Lawyers" button

---

## 🚨 If Still Not Working

### Last Resort Fixes

1. **Delete node_modules and reinstall:**
```bash
rm -rf node_modules
npm install
npm run dev
```

2. **Check if port 3000 is blocked:**
```bash
npx kill-port 3000
npm run dev
```

3. **Try different browser:**
- Chrome
- Firefox
- Edge

4. **Check firewall:**
- Gemini API might be blocked
- Try disabling firewall temporarily

---

## 📞 Getting Help

### Information to Provide

If asking for help, provide:
1. Browser console errors (screenshot)
2. Network tab showing API calls
3. "Gemini Response" log from console
4. Query you're testing with
5. Browser and OS version

---

## 🎯 Quick Test Checklist

- [ ] Server is running (`npm run dev`)
- [ ] Browser is open to http://localhost:3000/ai-assistant
- [ ] Location is selected
- [ ] Console is open (F12)
- [ ] Typed a query and submitted
- [ ] Checked console for logs
- [ ] Checked Network tab for API calls
- [ ] Tried hard refresh (Ctrl + Shift + R)
- [ ] Tried different query
- [ ] Cleared cache and tried again

---

## 💡 Pro Tips

1. **Always check console first** - Most issues show errors there
2. **Use simple queries for testing** - "divorce", "property dispute"
3. **Watch the Network tab** - See if API calls are made
4. **Check the logs** - "Gemini Response" and "Parsed JSON"
5. **Restart server after code changes** - Vite hot reload might miss some changes

---

**If you see the lawyer recommendation card (purple), it's working!** 🎉

**If you don't see it, check console logs and follow steps above.** 🔍

---

**Last Updated:** December 7, 2024
