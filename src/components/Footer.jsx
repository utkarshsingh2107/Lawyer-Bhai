import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <Scale size={32} />
              <span className="logo-text">Lawyerbhai</span>
            </div>
            <p>Connecting you with the right legal expertise</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <Link to="/location">Find Advocates</Link>
              <Link to="/ai-assistant">AI Assistant</Link>
              <Link to="/">How It Works</Link>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/ai-assistant">AI Disclaimer</Link>
            </div>
            
            <div className="footer-column">
              <h4>Contact</h4>
              <a href="mailto:support@lawyerbhai.com">Support</a>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Lawyerbhai. All rights reserved. | Prototype Demo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
