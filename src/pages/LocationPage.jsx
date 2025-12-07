import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import './LocationPage.css';

const cities = [
  'Delhi', 'Mumbai', 'Lucknow', 'Jaipur', 'Bangalore',
  'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad',
  'Chandigarh', 'Patna'
];

const LocationPage = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const { updateCity } = useLocation();
  const navigate = useNavigate();

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleContinue = () => {
    if (selectedCity) {
      updateCity(selectedCity);
      navigate('/advocates');
    } else {
      alert('Please select a city first');
    }
  };

  const handleUseLocation = () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setSelectedCity(randomCity);
    setTimeout(() => {
      alert(`Location detected: ${randomCity}`);
    }, 500);
  };

  return (
    <div className="location-page">
      <div className="container">
        <div className="location-container">
          <div className="location-header">
            <div className="location-icon">📍</div>
            <h1>Where are you looking for an advocate?</h1>
            <p>Select your city to find verified advocates near you</p>
          </div>

          <div className="location-input-box">
            <label htmlFor="citySelect">Select Your City</label>
            <select
              id="citySelect"
              className="city-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Choose your city...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <div className="divider">
              <span>OR</span>
            </div>

            <button className="btn-location" onClick={handleUseLocation}>
              <span className="location-icon-btn">📍</span>
              Use My Current Location
            </button>

            <button
              className="btn btn-primary"
              onClick={handleContinue}
              disabled={!selectedCity}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Continue to Find Advocates
            </button>
          </div>

          <div className="popular-cities">
            <h3>Popular Cities</h3>
            <div className="city-chips">
              {cities.slice(0, 8).map(city => (
                <button
                  key={city}
                  className={`city-chip ${selectedCity === city ? 'active' : ''}`}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
