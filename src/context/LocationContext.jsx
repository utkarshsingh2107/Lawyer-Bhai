import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('userCity') || null;
  });

  const updateCity = (city) => {
    setSelectedCity(city);
    localStorage.setItem('userCity', city);
  };

  const clearCity = () => {
    setSelectedCity(null);
    localStorage.removeItem('userCity');
  };

  const value = {
    selectedCity,
    updateCity,
    clearCity
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
