import React, { useState } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  // YOUR API KEY
  const API_KEY = 'H2CSKLQJTQMW7M8HQ43GNJ7HG'; 

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );
      if (!response.ok) throw new Error('Location not found');
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>Sky Scout</h1>
      
      {/* Requirement: Input field for location */}
      <div className="search">
        <input 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Enter City..." 
        />
        <button onClick={() => fetchWeather(location)}>Search</button>
        {/* Requirement: Refresh the outlook */}
        <button onClick={() => fetchWeather(location)}>Refresh</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="content">
          {/* Requirement: Current weather details */}
          <div className="current">
            <h2>{weather.resolvedAddress}</h2>
            <p>Condition: {weather.currentConditions.conditions}</p>
            <p>Temp: {weather.currentConditions.temp}°C</p>
            <p>Wind: {weather.currentConditions.windspeed} km/h</p>
            <p>Rain Probability: {weather.currentConditions.precipprob}%</p>
          </div>

          {/* Requirement: Future 24 hour period */}
          <h3>Next 24 Hours</h3>
          <div className="hourly-wrap">
            {weather.days[0].hours.map((hour, i) => (
              <div key={i} className="hour-card">
                <p>{hour.datetime.slice(0, 5)}</p>
                <p>{hour.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;