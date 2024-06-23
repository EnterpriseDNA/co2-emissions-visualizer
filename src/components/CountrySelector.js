import React from 'react';

const CountrySelector = ({ countries, selectedCountry, onSelectCountry }) => (
  <div className="country-selector">
    <label htmlFor="country-select">Select a country: </label>
    <select 
      id="country-select" 
      value={selectedCountry} 
      onChange={(e) => onSelectCountry(e.target.value)}
    >
      {countries.map(country => (
        <option key={country} value={country}>{country}</option>
      ))}
    </select>
  </div>
);

export default CountrySelector;