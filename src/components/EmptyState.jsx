import { Scale, Search, AlertCircle, FileX } from 'lucide-react';
import './EmptyState.css';

const EmptyState = ({ 
  type = 'no-results', 
  title, 
  message, 
  actionText, 
  onAction 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'no-results':
        return <Search size={64} />;
      case 'no-advocates':
        return <Scale size={64} />;
      case 'error':
        return <AlertCircle size={64} />;
      case 'no-data':
        return <FileX size={64} />;
      default:
        return <Search size={64} />;
    }
  };

  const getDefaultContent = () => {
    switch (type) {
      case 'no-results':
        return {
          title: title || 'No results found',
          message: message || 'Try adjusting your search or filters'
        };
      case 'no-advocates':
        return {
          title: title || 'No advocates available',
          message: message || 'No advocates found in your selected location'
        };
      case 'error':
        return {
          title: title || 'Something went wrong',
          message: message || 'Please try again later'
        };
      case 'no-data':
        return {
          title: title || 'No data available',
          message: message || 'There is no data to display'
        };
      default:
        return {
          title: title || 'Nothing here',
          message: message || 'No content available'
        };
    }
  };

  const content = getDefaultContent();

  return (
    <div className="empty-state">
      <div className="empty-state-icon">{getIcon()}</div>
      <h3 className="empty-state-title">{content.title}</h3>
      <p className="empty-state-message">{content.message}</p>
      {actionText && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
