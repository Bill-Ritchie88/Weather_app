import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State: This is the app's memory
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'H2CSKLQJTQMW7M8HQ43GNJ7HG';

  const fetchWeather = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Requirements call for current, previous 24h, and future 24h
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );
      
      if (!response.ok) throw new Error('Location not found');
      
      const data = await response.json();
      setWeather(data); 
      console.log(data); // Look at your console to see the "treasure chest" of data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Stretch Goal: Default to current location on load
  useEffect(() => {
    // We will add the Geolocation logic here next!
  }, []);

return (
  <div className="app-container">
    <h1>Sky Scout</h1>
    
    <div className="search-box">
      <input 
        type="text" 
        placeholder="Enter location (e.g. Nairobi)" 
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {/* Requirement: User can refresh/trigger the search */}
      <button onClick={() => fetchWeather(location)}>Search</button>
      <button onClick={() => fetchWeather(location)}>Refresh</button>
    </div>

    {loading && <p>Loading...</p>}
    {error && <p className="error">{error}</p>}

    {weather && (
      <div className="weather-display">
        {/* Requirement: Temp, Wind, Rain, and General Weather */}
        <div className="current-card">
          <h2>{weather.resolvedAddress}</h2>
          <h3>{weather.currentConditions.conditions}</h3>
          <p className="temp">{weather.currentConditions.temp}°C</p>
          <div className="details">
            <span>Wind: {weather.currentConditions.windspeed} km/h</span>
            <span>Rain: {weather.currentConditions.precipprob}%</span>
          </div>
        </div>

        {/* Requirement: Future 24 Hour Period */}
        <div className="forecast-section">
          <h3>Next 24 Hours</h3>
          <div className="hourly-scroll">
            {weather.days[0].hours.map((hour, index) => (
              <div key={index} className="hour-pill">
                <span>{hour.datetime.slice(0, 5)}</span>
                <span>{hour.temp}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);
}