import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import toast from 'react-hot-toast';
import './AIFeedback.css';

const AIFeedback = ({ messageId, onFeedback }) => {
  const [feedback, setFeedback] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const handleFeedback = (type) => {
    setFeedback(type);
    setShowComment(true);
    
    if (type === 'positive') {
      toast.success('Thank you for your feedback!');
    }
  };

  const submitFeedback = () => {
    if (onFeedback) {
      onFeedback({
        messageId,
        type: feedback,
        comment: comment.trim()
      });
    }
    
    toast.success('Feedback submitted successfully!');
    setShowComment(false);
    setComment('');
  };

  return (
    <div className="ai-feedback">
      {!feedback ? (
        <div className="feedback-buttons">
          <span className="feedback-label">Was this helpful?</span>
          <button
            className="feedback-btn positive"
            onClick={() => handleFeedback('positive')}
            title="Helpful"
          >
            <ThumbsUp size={16} />
          </button>
          <button
            className="feedback-btn negative"
            onClick={() => handleFeedback('negative')}
            title="Not helpful"
          >
            <ThumbsDown size={16} />
          </button>
        </div>
      ) : (
        <div className="feedback-submitted">
          {feedback === 'positive' ? (
            <span className="feedback-thanks">
              <ThumbsUp size={16} /> Thank you for your feedback!
            </span>
          ) : (
            <span className="feedback-thanks">
              <ThumbsDown size={16} /> Thanks for letting us know
            </span>
          )}
        </div>
      )}

      {showComment && (
        <div className="feedback-comment">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more (optional)..."
            rows="3"
          />
          <div className="comment-actions">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setShowComment(false)}
            >
              Skip
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={submitFeedback}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIFeedback;
