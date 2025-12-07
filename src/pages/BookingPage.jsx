import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, User, Mail, Phone, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { advocate, selectedSlot } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseDescription: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Redirect if no advocate data
  if (!advocate || !selectedSlot) {
    navigate('/advocates');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    // Simulate booking creation
    const newBookingId = 'BK' + Date.now().toString().slice(-8);
    
    // In production, this would save to Firebase
    const bookingData = {
      bookingId: newBookingId,
      advocateId: advocate.id,
      advocateName: advocate.name,
      slot: selectedSlot,
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      caseDescription: formData.caseDescription,
      fees: advocate.fees,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    console.log('Booking created:', bookingData);
    
    setBookingId(newBookingId);
    setIsSubmitted(true);
    toast.success('Booking confirmed successfully!');
  };

  const handleCancel = () => {
    navigate(`/advocate/${id}`);
  };

  if (isSubmitted) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <div className="booking-card">
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle size={48} />
              </div>
              <h2>Booking Confirmed!</h2>
              <p>
                Your consultation has been successfully booked. 
                A confirmation email has been sent to {formData.email}
              </p>

              <div className="booking-details">
                <h3>Booking Details</h3>
                <div className="detail-row">
                  <span>Booking ID:</span>
                  <strong>{bookingId}</strong>
                </div>
                <div className="detail-row">
                  <span>Advocate:</span>
                  <strong>{advocate.name}</strong>
                </div>
                <div className="detail-row">
                  <span>Time Slot:</span>
                  <strong>{selectedSlot}</strong>
                </div>
                <div className="detail-row">
                  <span>Consultation Fee:</span>
                  <strong>₹{advocate.fees.toLocaleString()}</strong>
                </div>
                <div className="detail-row">
                  <span>Status:</span>
                  <strong style={{ color: '#059669' }}>Confirmed</strong>
                </div>
              </div>

              <div className="success-actions">
                <button className="btn btn-cancel" onClick={() => navigate('/advocates')}>
                  Browse More Advocates
                </button>
                <button className="btn btn-confirm" onClick={() => navigate('/dashboard')}>
                  View My Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-card">
          <div className="booking-header">
            <h1>Complete Your Booking</h1>
            <p>Fill in your details to confirm the consultation</p>
          </div>

          <div className="booking-summary">
            <div className="summary-row">
              <span className="summary-label">Advocate:</span>
              <span className="summary-value">{advocate.name}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Category:</span>
              <span className="summary-value">{advocate.category}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Time Slot:</span>
              <span className="summary-value">{selectedSlot}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Consultation Fee:</span>
              <span className="summary-value">₹{advocate.fees.toLocaleString()}</span>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <User size={16} style={{ display: 'inline', marginRight: '4px' }} />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={16} style={{ display: 'inline', marginRight: '4px' }} />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={16} style={{ display: 'inline', marginRight: '4px' }} />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="caseDescription">
                <FileText size={16} style={{ display: 'inline', marginRight: '4px' }} />
                Brief Case Description (Optional)
              </label>
              <textarea
                id="caseDescription"
                name="caseDescription"
                value={formData.caseDescription}
                onChange={handleInputChange}
                placeholder="Briefly describe your legal matter..."
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-confirm">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
