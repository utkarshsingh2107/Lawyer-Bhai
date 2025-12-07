import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import { Scale, MapPin, Star, Briefcase, Award, IndianRupee } from 'lucide-react';
import AdvocateSearch from '../components/AdvocateSearch';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import ADVOCATES_DATA from '../data/advocatesData';
import './AdvocatesPage.css';

const AdvocatesPage = () => {
  const navigate = useNavigate();
  const { selectedCity } = useLocation();
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    court: '',
    minRating: 0,
    sortBy: ''
  });

  useEffect(() => {
    // Redirect to location page if no city selected
    if (!selectedCity) {
      navigate('/location');
      return;
    }

    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      // Filter advocates by selected city
      const cityAdvocates = ADVOCATES_DATA.filter(adv => adv.city === selectedCity);
      setAdvocates(cityAdvocates);
      setFilteredAdvocates(cityAdvocates);
      setLoading(false);
    }, 800);
  }, [selectedCity, navigate]);

  useEffect(() => {
    // Apply filters and search
    let filtered = [...advocates];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(adv => 
        adv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adv.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(adv => adv.category === filters.category);
    }

    // Court filter
    if (filters.court) {
      filtered = filtered.filter(adv => adv.court === filters.court);
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(adv => adv.rating >= filters.minRating);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'rating-high':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'rating-low':
          filtered.sort((a, b) => a.rating - b.rating);
          break;
        case 'experience-high':
          filtered.sort((a, b) => b.experience - a.experience);
          break;
        case 'experience-low':
          filtered.sort((a, b) => a.experience - b.experience);
          break;
        case 'fees-low':
          filtered.sort((a, b) => a.fees - b.fees);
          break;
        case 'fees-high':
          filtered.sort((a, b) => b.fees - a.fees);
          break;
        default:
          break;
      }
    }

    setFilteredAdvocates(filtered);
  }, [filters, advocates, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({
        category: '',
        court: '',
        minRating: 0,
        sortBy: ''
      });
      setSearchTerm('');
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const handleBookNow = (advocateId) => {
    navigate(`/advocate/${advocateId}`);
  };

  if (!selectedCity) {
    return null;
  }

  return (
    <div className="advocates-page">
      <div className="advocates-header">
        <div className="header-content">
          <div className="location-badge">
            <MapPin size={20} />
            <span>{selectedCity}</span>
          </div>
          <h1>Advocates Near You</h1>
          <p>Found {filteredAdvocates.length} verified advocates in {selectedCity}</p>
        </div>
      </div>

      <div className="advocates-container">
        <div className="advocates-main">
          <AdvocateSearch 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
          />

          {loading ? (
            <LoadingSkeleton type="card" count={6} />
          ) : filteredAdvocates.length === 0 ? (
            <EmptyState 
              type="no-advocates"
              title="No advocates found"
              message={searchTerm || filters.category || filters.court ? 
                "Try adjusting your search or filters" : 
                `No advocates available in ${selectedCity}`}
              actionText="Clear Filters"
              onAction={() => handleFilterChange('reset', null)}
            />
          ) : (
            <div className="advocates-grid">
              {filteredAdvocates.map(advocate => (
                <div key={advocate.id} className="advocate-card">
                  <div className="advocate-image">
                    <img src={advocate.image} alt={advocate.name} />
                    <div className="verified-badge">✓ Verified</div>
                  </div>

                  <div className="advocate-info">
                    <h3>{advocate.name}</h3>
                    
                    <div className="advocate-meta">
                      <span className="category-badge">{advocate.category}</span>
                      <span className="court-badge">{advocate.court}</span>
                    </div>

                    <div className="advocate-stats">
                      <div className="stat">
                        <Briefcase size={16} />
                        <span>{advocate.experience} years</span>
                      </div>
                      <div className="stat">
                        <Star size={16} />
                        <span>{advocate.rating} rating</span>
                      </div>
                    </div>

                    <div className="advocate-cases">
                      <Award size={16} />
                      <span>{advocate.casesWon}/{advocate.casesHandled} cases won</span>
                    </div>

                    <div className="advocate-footer">
                      <div className="fees">
                        <IndianRupee size={18} />
                        <span>{advocate.fees.toLocaleString()}</span>
                        <small>/consultation</small>
                      </div>
                      <button 
                        className="btn-book"
                        onClick={() => handleBookNow(advocate.id)}
                      >
                        View Profile
                      </button>
                    </div>
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

export default AdvocatesPage;
