# LawyerBhai - Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server
```bash
npm run dev
```

Or use the batch file:
```bash
run-dev.bat
```

### 4. Open in Browser
Navigate to: `http://localhost:5173`

---

## 🎯 Testing the Platform

### Test Flow 1: Location-First Approach
1. Visit homepage
2. Click "Find Advocates"
3. Select a city (e.g., Delhi, Mumbai)
4. Browse advocates with filters
5. View advocate profile
6. Book consultation (requires login)

### Test Flow 2: AI Legal Assistant
1. Visit homepage
2. Click "AI Assistant"
3. Select your location
4. Describe a legal problem (examples provided)
5. Get AI analysis with lawyer recommendations
6. Click "Find Lawyers" to see advocates

### Test Flow 3: Authentication
1. Click "Login" or "Sign Up"
2. Create account or login
3. Access protected routes (Booking, Dashboard)

---

## ✨ New Features Implemented

### 1. Enhanced Search & Filters
- Search by name or category
- Filter by category, court level, rating
- Sort by rating, experience, fees
- Real-time filtering

### 2. Loading States
- Skeleton loaders for advocates
- Smooth loading animations
- Better UX during data fetch

### 3. Empty States
- No results found
- No advocates in city
- Clear call-to-action buttons

### 4. AI Improvements
- Legal disclaimer
- Rate limiting (5 requests per minute)
- Content safety checks
- Feedback system (thumbs up/down)

### 5. Security & Legal
- Error boundaries
- Cookie consent banner
- Privacy policy page
- Terms of service page
- Offline detection banner

---

## 🧪 Testing Checklist

### Basic Functionality
- [ ] Homepage loads correctly
- [ ] Location selection works
- [ ] Advocates list displays
- [ ] Search functionality works
- [ ] Filters apply correctly
- [ ] Sorting works
- [ ] Advocate detail page loads
- [ ] AI assistant responds
- [ ] Login/Signup works
- [ ] Protected routes redirect

### New Features
- [ ] Loading skeletons appear
- [ ] Empty states show when no results
- [ ] Search bar filters advocates
- [ ] Sort dropdown changes order
- [ ] Legal disclaimer shows on AI page
- [ ] Cookie consent banner appears
- [ ] Offline banner shows when offline
- [ ] AI feedback buttons work
- [ ] Rate limiting prevents spam
- [ ] Content safety blocks inappropriate input

### UI/UX
- [ ] Responsive on mobile
- [ ] Smooth animations
- [ ] No layout shifts
- [ ] Proper error messages
- [ ] Toast notifications work
- [ ] Navigation is consistent

---

## 🐛 Common Issues & Solutions

### Issue: "API key not found"
**Solution**: Check your `.env` file and ensure `VITE_GEMINI_API_KEY` is set

### Issue: "Too many requests"
**Solution**: Rate limiting is active. Wait 60 seconds and try again

### Issue: "No advocates found"
**Solution**: Make sure you've selected a city with advocates (Delhi, Mumbai, Bangalore, etc.)

### Issue: "Offline banner won't disappear"
**Solution**: Check your internet connection. The banner auto-hides when online

### Issue: "Cookie consent keeps appearing"
**Solution**: Accept or decline cookies. Your choice is saved in localStorage

---

## 📱 Mobile Testing

Test on different screen sizes:
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

---

## 🔧 Development Tips

### Hot Reload
Vite provides instant hot module replacement. Changes appear immediately.

### Component Structure
```
Page Component
  ├── Layout Components (Header, Footer)
  ├── Feature Components (Search, Filters)
  ├── UI Components (Cards, Buttons)
  └── Utility Components (Loading, Empty)
```

### State Management
- `LocationContext` - Selected city
- `AuthContext` - User authentication
- Local state - Component-specific data

### Styling
- CSS Modules for component styles
- Global styles in `index.css`
- Responsive design with media queries

---

## 📚 Documentation

- **IMPLEMENTATION_STATUS.md** - Current implementation status
- **COMPLETE_FIXES_GUIDE.md** - Detailed fix implementations
- **PRODUCTION_READINESS_REPORT.md** - QA evaluation report
- **GUIDE.md** - Platform overview
- **FILES_OVERVIEW.md** - File structure

---

## 🎨 Design System

### Colors
- Primary: `#2563EB` (Blue)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Error: `#ef4444` (Red)
- Gray: `#64748b`

### Typography
- Headings: System font stack
- Body: 16px base size
- Small: 14px
- Tiny: 12px

### Spacing
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Set environment variables
3. Deploy automatically on push

---

## 📞 Support

For issues or questions:
- Check documentation files
- Review implementation status
- Test with different scenarios
- Check browser console for errors

---

**Happy Testing! 🎉**

Last Updated: December 8, 2024
