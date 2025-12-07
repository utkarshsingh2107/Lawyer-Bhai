import './LegalPages.css';

const PrivacyPolicyPage = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: December 7, 2024</p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Location information (city selection)</li>
            <li>Legal queries and case descriptions</li>
            <li>Booking and consultation details</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Connect you with appropriate advocates</li>
            <li>Process bookings and consultations</li>
            <li>Send important notifications</li>
            <li>Analyze and improve our AI assistant</li>
          </ul>
        </section>

        <section>
          <h2>3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li>Advocates you choose to consult with</li>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>We use cookies and similar technologies to improve your experience and analyze usage patterns.</p>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>For privacy-related questions, contact us at: privacy@lawyerbhai.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
