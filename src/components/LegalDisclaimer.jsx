import { AlertTriangle, Shield, FileText, Scale } from 'lucide-react';
import './LegalDisclaimer.css';

const LegalDisclaimer = ({ onAccept }) => {
  return (
    <div className="legal-disclaimer-overlay">
      <div className="legal-disclaimer-modal">
        <div className="disclaimer-header">
          <div className="disclaimer-icon">
            <AlertTriangle size={48} />
          </div>
          <h2>⚠️ Important Legal Disclaimer</h2>
          <p className="disclaimer-subtitle">Please read carefully before using AI Assistant</p>
        </div>

        <div className="disclaimer-content">
          <div className="disclaimer-section">
            <div className="section-icon">
              <Shield size={24} />
            </div>
            <div className="section-text">
              <h3>Not Legal Advice</h3>
              <p>This AI assistant provides general information only and is <strong>NOT a substitute for professional legal advice</strong> from a licensed advocate.</p>
            </div>
          </div>

          <div className="disclaimer-section">
            <div className="section-icon">
              <FileText size={24} />
            </div>
            <div className="section-text">
              <h3>No Attorney-Client Relationship</h3>
              <p>Using this AI assistant does <strong>NOT create an attorney-client relationship</strong>. Always consult a qualified lawyer for your specific situation.</p>
            </div>
          </div>

          <div className="disclaimer-section">
            <div className="section-icon">
              <Scale size={24} />
            </div>
            <div className="section-text">
              <h3>Verify Information</h3>
              <p>AI responses may contain errors. <strong>Always verify information</strong> with a licensed advocate before taking any legal action.</p>
            </div>
          </div>

          <div className="disclaimer-warning">
            <h4>⚠️ Important Points:</h4>
            <ul>
              <li>Responses are for informational purposes only</li>
              <li>AI may not have the latest legal updates</li>
              <li>Every legal case is unique and requires professional assessment</li>
              <li>LawyerBhai is not liable for decisions based on AI responses</li>
              <li>In case of emergency, contact a lawyer immediately</li>
            </ul>
          </div>

          <div className="disclaimer-footer">
            <p><strong>By clicking "I Understand & Accept", you acknowledge that you have read and understood this disclaimer.</strong></p>
          </div>
        </div>

        <div className="disclaimer-actions">
          <button className="btn-accept" onClick={onAccept}>
            <Shield size={20} />
            I Understand & Accept
          </button>
          <p className="disclaimer-note">
            You can review our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-of-service">Terms of Service</a> anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalDisclaimer;
