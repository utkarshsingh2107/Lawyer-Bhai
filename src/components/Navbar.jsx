import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { Scale, MapPin, LogOut, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { selectedCity } = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <Scale size={32} />
            <span className="logo-text">Lawyerbhai</span>
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/location">Find Advocates</Link>
            <Link to="/ai-assistant">AI Assistant</Link>
            
            {selectedCity && (
              <div className="location-badge-nav">
                <MapPin size={16} />
                <span>{selectedCity}</span>
              </div>
            )}

            {currentUser ? (
              <>
                <Link to="/dashboard" className="nav-user">
                  <User size={18} />
                  <span>{currentUser.displayName || 'Profile'}</span>
                </Link>
                <button onClick={handleLogout} className="btn-logout">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary-small">Login</Link>
                <Link to="/signup" className="btn-primary-small">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
