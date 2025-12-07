import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find the Right Advocate Near You</h1>
            <p className="hero-subtitle">
              Search local advocates based on your location, compare ratings, experience, 
              and book consultation slots instantly.
            </p>
            <div className="hero-buttons">
              <Link to="/location" className="btn btn-primary">
                Find Nearby Advocates
              </Link>
              <Link to="/ai-assistant" className="btn btn-secondary">
                Try AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">💬</div>
              <h3>Describe Your Problem</h3>
              <p>Tell us about your legal issue in simple language using our AI assistant</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🔍</div>
              <h3>Get Matched</h3>
              <p>AI identifies the right lawyer category and shows verified advocates</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">📅</div>
              <h3>Book Consultation</h3>
              <p>Choose a time slot and book your consultation instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Location-Based Search</h3>
              <p>Find advocates near your city with local court expertise</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Legal Assistant</h3>
              <p>Smart AI analyzes your case and recommends local advocates</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Verified Lawyers</h3>
              <p>All advocates are verified with bar council registration</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Instant Booking</h3>
              <p>Book time slots directly and get instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Advocate?</h2>
            <p>Get started now and connect with the right legal expert for your case</p>
            <div className="cta-buttons">
              <Link to="/location" className="btn btn-primary">
                Find Nearby Advocates
              </Link>
              <Link to="/ai-assistant" className="btn btn-secondary">
                Use AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
