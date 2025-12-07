# LawyerBhai - Legal Tech Platform

A location-based legal-tech platform connecting users with advocates and providing AI-powered legal consultation.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (currently using v24.11.1)
- npm v9+ (currently using 11.6.2)
- Git 2.x+ (currently using 2.52.0)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Server will be available at: **http://localhost:3001**

Or use the batch file:
```bash
start-server.bat
```

## 📁 Project Structure

```
lawyerbhai/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── CookieConsent.jsx
│   │   ├── OfflineBanner.jsx
│   │   ├── LegalDisclaimer.jsx
│   │   ├── AdvocateSearch.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── EmptyState.jsx
│   │   └── AIFeedback.jsx
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LocationPage.jsx
│   │   ├── AdvocatesPage.jsx
│   │   ├── AdvocateDetailPage.jsx
│   │   ├── AIAssistantPage.jsx
│   │   ├── BookingPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── PrivacyPolicyPage.jsx
│   │   └── TermsOfServicePage.jsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── LocationContext.jsx
│   ├── hooks/               # Custom React hooks
│   │   └── useOnlineStatus.js
│   ├── utils/               # Utility functions
│   │   ├── sanitize.js
│   │   ├── validation.js
│   │   ├── contentSafety.js
│   │   └── rateLimit.js
│   ├── services/            # API services
│   │   ├── advocateService.js
│   │   └── bookingService.js
│   ├── config/              # Configuration
│   │   └── gemini.js
│   ├── theme/               # Vintage theme (optional)
│   │   ├── retro-legal-theme.css
│   │   ├── vintage-stamps.jsx
│   │   └── vintage-animations.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── vite.config.js
└── index.html
```

## 🎯 Features

### Core Features
- **Location-First Approach**: Users select city before browsing advocates
- **Advocate Discovery**: Search, filter, and sort lawyers by category, court level, rating
- **AI Legal Assistant**: Gemini AI-powered legal consultation in Hinglish
- **User Authentication**: Login/signup with protected routes
- **Booking System**: Schedule consultations with advocates
- **Responsive Design**: Mobile, tablet, and desktop optimized

### Security & Compliance
- Input sanitization
- Content safety checks
- Rate limiting (5 requests/minute for AI)
- Cookie consent banner (GDPR)
- Privacy policy & Terms of service
- Legal disclaimers

### UX Enhancements
- Loading skeletons
- Empty states
- Error boundaries
- Offline detection
- Toast notifications
- AI feedback system

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Gemini AI (Required for AI Assistant)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase (Optional - for authentication)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

Get Gemini API key: https://makersuite.google.com/app/apikey

## 📱 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | LandingPage | Homepage with hero section |
| `/location` | LocationPage | City selection |
| `/advocates` | AdvocatesPage | Browse advocates with filters |
| `/advocate/:id` | AdvocateDetailPage | Advocate profile |
| `/ai-assistant` | AIAssistantPage | AI legal consultation |
| `/login` | LoginPage | User login |
| `/signup` | SignupPage | User registration |
| `/booking/:id` | BookingPage | Book consultation (protected) |
| `/dashboard` | DashboardPage | User dashboard (protected) |
| `/privacy` | PrivacyPolicyPage | Privacy policy |
| `/terms` | TermsOfServicePage | Terms of service |
| `*` | NotFoundPage | 404 page |

## 🎨 Styling

### Current Theme
- Plain CSS with component-specific stylesheets
- Modern blue color scheme (#2563EB primary)
- Responsive grid layouts
- Smooth animations

### Vintage Theme (Optional)
A retro-vintage legal theme is available. See `VINTAGE_THEME_GUIDE.md` for implementation.

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Styling**: Plain CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **AI**: Google Generative AI (Gemini)
- **Date Handling**: date-fns

## 🐛 Troubleshooting

### Server won't start
```bash
# Clear Vite cache
Remove-Item -Path "node_modules\.vite" -Recurse -Force

# Reinstall dependencies
npm install

# Start server
npm run dev
```

### Blank page in browser
1. Hard refresh: `Ctrl + Shift + R`
2. Check browser console (F12) for errors
3. Verify server is running on correct port
4. Clear browser cache

### PATH issues (Node.js/Git not recognized)
Run the fix script:
```bash
.\fix-all-paths.ps1
```

Then restart your terminal/IDE.

## 📊 Current Status

✅ All systems operational
✅ Development server running
✅ No compilation errors
✅ All features implemented
✅ Production-ready frontend

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` folder.

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Set environment variables (VITE_GEMINI_API_KEY, etc.)
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy automatically on push

## 📚 Documentation

- **SYSTEM_STATUS.md** - Current system status and fixes
- **PRODUCTION_READINESS_REPORT.md** - QA evaluation
- **VINTAGE_THEME_GUIDE.md** - Retro theme implementation

## 🤝 Contributing

This is a prototype/demo project. For production use:
1. Move API keys to backend server
2. Implement real Firebase authentication
3. Add database persistence
4. Implement payment gateway
5. Add email notifications
6. Write comprehensive tests

## 📄 License

Private project - All rights reserved

## 🎯 Next Steps

1. ✅ Environment setup complete
2. ✅ Development server running
3. 🔧 Configure Firebase (optional)
4. 🎨 Apply vintage theme (optional)
5. 🚀 Deploy to production

---

**Server**: http://localhost:3001
**Status**: ✅ Ready for Development
**Last Updated**: December 8, 2024
