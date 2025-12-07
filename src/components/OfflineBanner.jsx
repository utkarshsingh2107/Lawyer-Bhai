import { WifiOff, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import './OfflineBanner.css';

const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  const handleRetry = () => {
    window.location.reload();
  };

  if (isOnline) return null;

  return (
    <div className="offline-banner">
      <div className="offline-content">
        <WifiOff size={20} />
        <span className="offline-message">
          You're offline. Some features may not work properly.
        </span>
        <button className="btn-retry" onClick={handleRetry} aria-label="Retry connection">
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    </div>
  );
};

export default OfflineBanner;
