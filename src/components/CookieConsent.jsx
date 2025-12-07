import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <div className="cookie-icon">
          <Cookie size={24} />
        </div>
        <div className="cookie-text">
          <h4>🍪 We use cookies</h4>
          <p>
            We use cookies to improve your experience and analyze site usage. 
            By using LawyerBhai, you agree to our{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="btn-accept" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn-decline" onClick={handleDecline}>
            Decline
          </button>
        </div>
        <button className="btn-close" onClick={handleDecline} aria-label="Close">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
