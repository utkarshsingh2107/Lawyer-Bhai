import './LegalPages.css';

const TermsOfServicePage = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: December 7, 2024</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using LawyerBhai, you accept and agree to be bound by these Terms of Service.</p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>LawyerBhai is a platform that connects users with legal advocates. We provide:</p>
          <ul>
            <li>Location-based advocate discovery</li>
            <li>AI-powered legal guidance (informational only)</li>
            <li>Booking and consultation services</li>
          </ul>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate information</li>
            <li>Use the service lawfully</li>
            <li>Respect advocate-client confidentiality</li>
            <li>Not misuse or abuse the platform</li>
          </ul>
        </section>

        <section>
          <h2>4. AI Assistant Disclaimer</h2>
          <p className="important-notice">
            <strong>IMPORTANT:</strong> Our AI assistant provides general legal information only. 
            It is NOT a substitute for professional legal advice. Always consult with a qualified 
            advocate for your specific legal matters.
          </p>
        </section>

        <section>
          <h2>5. Booking and Payments</h2>
          <p>Consultation fees are set by individual advocates. Payment terms and cancellation policies may vary.</p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>LawyerBhai is a platform connecting users with advocates. We are not responsible for:</p>
          <ul>
            <li>Quality of legal services provided by advocates</li>
            <li>Outcomes of legal cases</li>
            <li>Disputes between users and advocates</li>
          </ul>
        </section>

        <section>
          <h2>7. Intellectual Property</h2>
          <p>All content on LawyerBhai is protected by copyright and other intellectual property laws.</p>
        </section>

        <section>
          <h2>8. Termination</h2>
          <p>We reserve the right to terminate or suspend access to our service for violations of these terms.</p>
        </section>

        <section>
          <h2>9. Changes to Terms</h2>
          <p>We may modify these terms at any time. Continued use constitutes acceptance of modified terms.</p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>For questions about these terms, contact: legal@lawyerbhai.com</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
