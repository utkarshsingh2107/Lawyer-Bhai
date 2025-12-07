import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Briefcase, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  Scale,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import './AdvocateDetailPage.css';

// Dummy data - matches AdvocatesPage data
const DUMMY_ADVOCATES = {
  '1': {
    id: '1',
    name: 'Adv. Rajesh Kumar',
    city: 'Delhi',
    category: 'Criminal Law',
    court: 'High Court',
    experience: 15,
    rating: 4.8,
    casesHandled: 250,
    casesWon: 210,
    fees: 5000,
    image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=2563EB&color=fff&size=200',
    about: 'Senior advocate with 15 years of experience in criminal law. Specialized in handling complex criminal cases at High Court level. Known for thorough case preparation and strong courtroom presence.',
    specializations: ['Criminal Defense', 'White Collar Crimes', 'Bail Applications', 'Appeals'],
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@lawfirm.com',
    reviews: [
      { author: 'Amit Singh', rating: 5, text: 'Excellent advocate! Won my case with great expertise.' },
      { author: 'Priya Sharma', rating: 5, text: 'Very professional and knowledgeable. Highly recommended.' },
      { author: 'Rahul Verma', rating: 4, text: 'Good experience, handled my case well.' }
    ]
  },
  '2': {
    id: '2',
    name: 'Adv. Priya Sharma',
    city: 'Delhi',
    category: 'Family Law',
    court: 'District Court',
    experience: 8,
    rating: 4.6,
    casesHandled: 180,
    casesWon: 155,
    fees: 3000,
    image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=2563EB&color=fff&size=200',
    about: 'Compassionate family law advocate with expertise in divorce, custody, and domestic violence cases. Focuses on amicable settlements while protecting client interests.',
    specializations: ['Divorce', 'Child Custody', 'Domestic Violence', 'Maintenance'],
    phone: '+91 98765 43211',
    email: 'priya.sharma@lawfirm.com',
    reviews: [
      { author: 'Neha Gupta', rating: 5, text: 'Very understanding and supportive during difficult times.' },
      { author: 'Vikram Patel', rating: 4, text: 'Professional approach to sensitive family matters.' }
    ]
  },
  '3': {
    id: '3',
    name: 'Adv. Amit Verma',
    city: 'Mumbai',
    category: 'Corporate Law',
    court: 'High Court',
    experience: 12,
    rating: 4.9,
    casesHandled: 300,
    casesWon: 275,
    fees: 8000,
    image: 'https://ui-avatars.com/api/?name=Amit+Verma&background=2563EB&color=fff&size=200',
    about: 'Corporate law specialist with extensive experience in mergers, acquisitions, and commercial disputes. Advises startups and established businesses.',
    specializations: ['Corporate Litigation', 'M&A', 'Contract Disputes', 'Compliance'],
    phone: '+91 98765 43212',
    email: 'amit.verma@lawfirm.com',
    reviews: [
      { author: 'Startup Founder', rating: 5, text: 'Invaluable advice for our business legal matters.' },
      { author: 'CEO', rating: 5, text: 'Expert in corporate law, highly recommended.' }
    ]
  }
};

const AVAILABLE_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '2:00 PM - 3:00 PM',
  '3:30 PM - 4:30 PM',
  '5:00 PM - 6:00 PM',
  '6:30 PM - 7:30 PM'
];

const AdvocateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [advocate, setAdvocate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    // Fetch advocate details (using dummy data for now)
    const advocateData = DUMMY_ADVOCATES[id];
    if (advocateData) {
      setAdvocate(advocateData);
    } else {
      toast.error('Advocate not found');
      navigate('/advocates');
    }
  }, [id, navigate]);

  const handleBookNow = () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    // Navigate to booking page with advocate and slot info
    navigate(`/booking/${id}`, { 
      state: { 
        advocate, 
        selectedSlot 
      } 
    });
  };

  if (!advocate) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  const winRate = ((advocate.casesWon / advocate.casesHandled) * 100).toFixed(1);

  return (
    <div className="advocate-detail-page">
      <div className="detail-container">
        <button className="back-button" onClick={() => navigate('/advocates')}>
          <ArrowLeft size={20} />
          Back to Advocates
        </button>

        <div className="detail-grid">
          <div className="advocate-profile">
            <div className="profile-header">
              <div className="profile-image">
                <img src={advocate.image} alt={advocate.name} />
              </div>

              <div className="profile-info">
                <h1>{advocate.name}</h1>
                
                <div className="profile-badges">
                  <span className="badge badge-verified">
                    <CheckCircle size={16} style={{ display: 'inline', marginRight: '4px' }} />
                    Verified
                  </span>
                  <span className="badge badge-category">{advocate.category}</span>
                  <span className="badge badge-court">{advocate.court}</span>
                </div>

                <div className="profile-stats">
                  <div className="stat-box">
                    <span className="value">{advocate.experience}</span>
                    <span className="label">Years Experience</span>
                  </div>
                  <div className="stat-box">
                    <span className="value">{advocate.rating}</span>
                    <span className="label">Rating</span>
                  </div>
                  <div className="stat-box">
                    <span className="value">{winRate}%</span>
                    <span className="label">Success Rate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>
                <FileText size={24} />
                About
              </h2>
              <p>{advocate.about}</p>
            </div>

            <div className="profile-section">
              <h2>
                <Scale size={24} />
                Specializations
              </h2>
              <div className="specializations">
                {advocate.specializations.map((spec, index) => (
                  <span key={index} className="specialization-tag">{spec}</span>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h2>
                <Award size={24} />
                Case Statistics
              </h2>
              <p>
                <strong>Total Cases Handled:</strong> {advocate.casesHandled}<br />
                <strong>Cases Won:</strong> {advocate.casesWon}<br />
                <strong>Success Rate:</strong> {winRate}%
              </p>
            </div>

            <div className="profile-section">
              <h2>
                <Star size={24} />
                Client Reviews
              </h2>
              <div className="reviews-list">
                {advocate.reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <span className="review-author">{review.author}</span>
                      <div className="review-rating">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="booking-sidebar">
            <div className="booking-card">
              <h3>Book Consultation</h3>
              
              <div className="price-display">
                ₹{advocate.fees.toLocaleString()}
              </div>
              <p className="price-label">Per consultation</p>

              <div className="slots-section">
                <h4>
                  <Calendar size={18} style={{ display: 'inline', marginRight: '8px' }} />
                  Available Time Slots
                </h4>
                <div className="slots-grid">
                  {AVAILABLE_SLOTS.map((slot, index) => (
                    <button
                      key={index}
                      className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className="btn-book-now"
                onClick={handleBookNow}
                disabled={!selectedSlot}
              >
                {selectedSlot ? 'Proceed to Book' : 'Select a Time Slot'}
              </button>
            </div>

            <div className="contact-info">
              <h4>Contact Information</h4>
              <div className="contact-item">
                <MapPin size={18} />
                <span>{advocate.city}</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>{advocate.phone}</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>{advocate.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocateDetailPage;
