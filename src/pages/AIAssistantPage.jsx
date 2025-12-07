import { useState, useRef, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import { useNavigate } from 'react-router-dom';
import { analyzeLegalCase } from '../config/gemini';
import { MapPin, Send, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import LegalDisclaimer from '../components/LegalDisclaimer';
import AIFeedback from '../components/AIFeedback';
import { checkRateLimit } from '../utils/rateLimit';
import { checkContentSafety } from '../utils/contentSafety';
import './AIAssistantPage.css';

const AIAssistantPage = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const { selectedCity } = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    setMessages([{
      type: 'bot',
      content: {
        text: `Hello! I'm your AI Legal Assistant powered by Gemini AI. ${selectedCity ? `I see you're in ${selectedCity}.` : ''} Please describe your legal issue in detail, and I'll help you find the right advocate.`,
        examples: [
          "I want to file for divorce and need help with custody",
          "My landlord is not returning my security deposit",
          "I've been falsely accused in a criminal case",
          "Need help with business partnership agreement"
        ]
      }
    }]);
  }, [selectedCity]);

  const handleLocationPrompt = () => {
    navigate('/location');
  };

  const fillExample = (example) => {
    setUserInput(example);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      toast.error('Please describe your legal problem');
      return;
    }

    if (!selectedCity) {
      toast.error('Please select your location first');
      handleLocationPrompt();
      return;
    }

    // Check rate limit
    const rateLimitCheck = checkRateLimit('ai-assistant');
    if (!rateLimitCheck.allowed) {
      toast.error(`Too many requests. Please wait ${Math.ceil(rateLimitCheck.retryAfter / 1000)} seconds.`);
      return;
    }

    // Check content safety
    const safetyCheck = checkContentSafety(userInput);
    if (!safetyCheck.safe) {
      toast.error(safetyCheck.reason);
      return;
    }

    // Add user message
    const userMessage = {
      type: 'user',
      content: { text: userInput }
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setLoading(true);

    try {
      // Call Gemini AI
      const analysis = await analyzeLegalCase(userInput, selectedCity);
      
      // Add AI response
      const botMessage = {
        type: 'bot',
        content: {
          analysis,
          city: selectedCity
        },
        id: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
      toast.success('Case analyzed successfully!');
    } catch (error) {
      console.error('AI Analysis Error:', error);
      toast.error('Failed to analyze case. Please try again.');
      
      // Add error message
      const errorMessage = {
        type: 'bot',
        content: {
          text: 'Sorry, I encountered an error analyzing your case. Please try again or contact support.',
          error: true
        }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (feedbackData) => {
    console.log('AI Feedback:', feedbackData);
    // TODO: Send feedback to backend
  };

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem('lawyerbhai_disclaimer_accepted', 'true');
  };

  useEffect(() => {
    // Check if disclaimer was already accepted
    const disclaimerAccepted = localStorage.getItem('lawyerbhai_disclaimer_accepted');
    if (disclaimerAccepted === 'true') {
      setShowDisclaimer(false);
    }
  }, []);

  return (
    <div className="ai-assistant-page">
      <div className="container">
        {showDisclaimer && <LegalDisclaimer onAccept={handleAcceptDisclaimer} />}
        <div className="ai-container">
          {/* Header */}
          <div className="ai-header">
            <h1>🤖 AI Legal Assistant</h1>
            <p>Powered by Google Gemini AI</p>
            {selectedCity && (
              <div className="location-badge">
                <MapPin size={16} />
                <span>{selectedCity}</span>
                <button onClick={handleLocationPrompt} className="change-btn">
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Chat Container */}
          <div className="chat-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'bot' ? '🤖' : '👤'}
                </div>
                <div className="message-content">
                  {message.type === 'user' ? (
                    <p>{message.content.text}</p>
                  ) : message.content.analysis ? (
                    <AnalysisResult 
                      analysis={message.content.analysis} 
                      city={message.content.city}
                      messageId={message.id}
                      onFeedback={handleFeedback}
                    />
                  ) : (
                    <WelcomeMessage content={message.content} onExampleClick={fillExample} />
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <Loader className="spinner-icon" />
                    <span>Analyzing your case with Gemini AI...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="input-form">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe your legal problem in detail..."
              rows="3"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !userInput.trim()} className="btn btn-primary">
              {loading ? <Loader className="spinner-icon" /> : <Send size={20} />}
              <span>{loading ? 'Analyzing...' : 'Analyze Case'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Welcome Message Component
const WelcomeMessage = ({ content, onExampleClick }) => (
  <div className="welcome-content">
    <p>{content.text}</p>
    {content.examples && (
      <div className="examples">
        <p><strong>Try these examples:</strong></p>
        {content.examples.map((example, idx) => (
          <button
            key={idx}
            className="example-btn"
            onClick={() => onExampleClick(example)}
          >
            {example}
          </button>
        ))}
      </div>
    )}
  </div>
);

// Enhanced Analysis Result Component
const AnalysisResult = ({ analysis, city, messageId, onFeedback }) => (
  <div className="analysis-result">
    <h3>📋 Case Analysis</h3>
    
    <div className="analysis-grid">
      <div className="analysis-item">
        <span className="label">Case Type:</span>
        <span className="value">{analysis.caseType}</span>
      </div>
      <div className="analysis-item">
        <span className="label">Urgency:</span>
        <span className="value urgency">{analysis.urgency}</span>
      </div>
      <div className="analysis-item">
        <span className="label">Complexity:</span>
        <span className="value">{analysis.complexity}</span>
      </div>
      <div className="analysis-item">
        <span className="label">Recommended Court:</span>
        <span className="value">{analysis.recommendedCourt}</span>
      </div>
    </div>

    {/* Lawyer Recommendation Section */}
    {analysis.lawyerType && (
      <div className="lawyer-recommendation">
        <h4>👨‍⚖️ Lawyer Recommendation</h4>
        <div className="lawyer-type-badge">{analysis.lawyerType}</div>
        {analysis.whyThisLawyer && (
          <p className="lawyer-reason">{analysis.whyThisLawyer}</p>
        )}
      </div>
    )}

    <div className="advice-section">
      <h4>⚖️ Legal Advice</h4>
      <p>{analysis.legalAdvice}</p>
    </div>

    {/* Next Steps Section */}
    {analysis.nextSteps && analysis.nextSteps.length > 0 && (
      <div className="steps-section">
        <h4>📝 Next Steps</h4>
        <ol>
          {analysis.nextSteps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    )}

    {analysis.importantPoints && analysis.importantPoints.length > 0 && (
      <div className="points-section">
        <h4>📌 Important Points</h4>
        <ul>
          {analysis.importantPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    )}

    {analysis.documentsRequired && analysis.documentsRequired.length > 0 && (
      <div className="documents-section">
        <h4>📄 Documents Required</h4>
        <ul>
          {analysis.documentsRequired.map((doc, idx) => (
            <li key={idx}>{doc}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Legal Options Section */}
    {analysis.legalOptions && analysis.legalOptions.length > 0 && (
      <div className="options-section">
        <h4>⚖️ Legal Options Available</h4>
        <ul>
          {analysis.legalOptions.map((option, idx) => (
            <li key={idx}>{option}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Possible Risks Section */}
    {analysis.possibleRisks && (
      <div className="risks-section">
        <h4>⚠️ Possible Risks / Consequences</h4>
        <p>{analysis.possibleRisks}</p>
      </div>
    )}

    {analysis.estimatedTimeline && (
      <div className="timeline-section">
        <h4>⏱️ Estimated Timeline</h4>
        <p>{analysis.estimatedTimeline}</p>
      </div>
    )}

    {/* LawyerBhai Help Section */}
    {analysis.lawyerBhaiHelp && (
      <div className="platform-help">
        <h4>🚀 LawyerBhai कैसे मदद करेगा</h4>
        <p>{analysis.lawyerBhaiHelp}</p>
      </div>
    )}

    <div className="action-buttons">
      <button 
        className="btn btn-primary"
        onClick={() => window.location.href = '/advocates'}
      >
        Find {analysis.lawyerType || analysis.caseType + ' Lawyers'} in {city}
      </button>
    </div>

    {/* AI Feedback */}
    {messageId && <AIFeedback messageId={messageId} onFeedback={onFeedback} />}
  </div>
);

export default AIAssistantPage;
