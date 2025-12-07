import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LocationProvider } from './context/LocationContext'
import { AuthProvider } from './context/AuthContext'

// Pages
import LandingPage from './pages/LandingPage'
import LocationPage from './pages/LocationPage'
import AdvocatesPage from './pages/AdvocatesPage'
import AdvocateDetailPage from './pages/AdvocateDetailPage'
import AIAssistantPage from './pages/AIAssistantPage'
import BookingPage from './pages/BookingPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import CookieConsent from './components/CookieConsent'
import OfflineBanner from './components/OfflineBanner'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <LocationProvider>
            <div className="app">
              <OfflineBanner />
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/advocates" element={<AdvocatesPage />} />
                  <Route path="/advocate/:id" element={<AdvocateDetailPage />} />
                  <Route path="/ai-assistant" element={<AIAssistantPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* Legal Pages */}
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/booking/:advocateId" 
                    element={
                      <ProtectedRoute>
                        <BookingPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* 404 Page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <CookieConsent />
              <Toaster position="top-right" />
            </div>
          </LocationProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
