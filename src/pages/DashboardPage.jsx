import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  XCircle,
  FileText,
  IndianRupee
} from 'lucide-react';
import toast from 'react-hot-toast';
import './DashboardPage.css';

// Dummy bookings data
const DUMMY_BOOKINGS = [
  {
    id: 'BK12345678',
    advocateId: '1',
    advocateName: 'Adv. Rajesh Kumar',
    category: 'Criminal Law',
    city: 'Delhi',
    slot: '10:00 AM - 11:00 AM',
    date: '2024-12-15',
    fees: 5000,
    status: 'confirmed',
    createdAt: '2024-12-07T10:30:00'
  },
  {
    id: 'BK12345679',
    advocateId: '2',
    advocateName: 'Adv. Priya Sharma',
    category: 'Family Law',
    city: 'Delhi',
    slot: '2:00 PM - 3:00 PM',
    date: '2024-12-20',
    fees: 3000,
    status: 'pending',
    createdAt: '2024-12-06T14:20:00'
  },
  {
    id: 'BK12345680',
    advocateId: '3',
    advocateName: 'Adv. Amit Verma',
    category: 'Corporate Law',
    city: 'Mumbai',
    slot: '11:30 AM - 12:30 PM',
    date: '2024-11-30',
    fees: 8000,
    status: 'completed',
    createdAt: '2024-11-25T09:15:00'
  }
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
      return;
    }

    // Get user info
    const name = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'User';
    setUserName(name);

    // Load bookings (using dummy data for now)
    setBookings(DUMMY_BOOKINGS);
  }, [navigate]);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  const handleViewDetails = (advocateId) => {
    navigate(`/advocate/${advocateId}`);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      toast.success('Booking cancelled successfully');
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
      );
    }
  };

  const handleReschedule = (bookingId) => {
    toast.info('Reschedule feature coming soon');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome back, {userName}!</h1>
          <p>Manage your consultations and bookings</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon blue">
              <Calendar size={28} />
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <CheckCircle size={28} />
            </div>
            <div className="stat-info">
              <h3>{stats.confirmed}</h3>
              <p>Confirmed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon yellow">
              <Clock size={28} />
            </div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <FileText size={28} />
            </div>
            <div className="stat-info">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="content-header">
            <h2>My Bookings</h2>
            <div className="filter-tabs">
              <button 
                className={`tab-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`tab-button ${filter === 'confirmed' ? 'active' : ''}`}
                onClick={() => setFilter('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`tab-button ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`tab-button ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Calendar size={40} />
              </div>
              <h3>No bookings found</h3>
              <p>Start by finding an advocate near you</p>
              <button className="btn-primary" onClick={() => navigate('/location')}>
                Find Advocates
              </button>
            </div>
          ) : (
            <div className="bookings-list">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="booking-info">
                      <h3>{booking.advocateName}</h3>
                      <p className="booking-id">Booking ID: {booking.id}</p>
                    </div>
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <FileText size={18} />
                      <span>{booking.category}</span>
                    </div>
                    <div className="detail-item">
                      <MapPin size={18} />
                      <span>{booking.city}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={18} />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <Clock size={18} />
                      <span>{booking.slot}</span>
                    </div>
                    <div className="detail-item">
                      <IndianRupee size={18} />
                      <span>₹{booking.fees.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    <button 
                      className="btn-action btn-view"
                      onClick={() => handleViewDetails(booking.advocateId)}
                    >
                      View Advocate
                    </button>
                    {booking.status === 'confirmed' && (
                      <>
                        <button 
                          className="btn-action btn-reschedule"
                          onClick={() => handleReschedule(booking.id)}
                        >
                          Reschedule
                        </button>
                        <button 
                          className="btn-action btn-cancel"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
