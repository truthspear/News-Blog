import './Weather.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      try {
        const defaultLocation = "Greater Noida";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=4162b2367849996832f6be37aa104a24`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching default location:", error);
      }
    };
    fetchDefaultLocation();
  }, []);

  const searchLocation = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4162b2367849996832f6be37aa104a24`;
      const response = await axios.get(url);
      setData(response.data);
      setLocation("");
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  };

  const getWeatherIcon = (weatherType) => {
    const iconMap = {
      'Clear': 'bx bx-sun',
      'Clouds': 'bx bx-cloud',
      'Rain': 'bx bx-cloud-rain',
      'Snow': 'bx bx-cloud-snow',
      'Thunderstorm': 'bx bx-cloud-lightning',
      'Haze': 'bx bx-cloud-fog',
      'Mist': 'bx bx-cloud-fog',
    };
    return <i className={iconMap[weatherType] || 'bx bx-cloud'}></i>;
  };

  return (
    <div className="weather">
      <div className="location-row">
        <i className="bx bx-map location-icon"></i>
        <h2 className="location-name">{data.name || "Loading..."}</h2>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div className="weather-data">
        {data.weather && data.weather[0] && (
          <>
            {getWeatherIcon(data.weather[0].main)}
            <div className="weather-condition">{data.weather[0].main}</div>
            <div className="temperature">
              {data.main ? `${Math.round(data.main.temp)}°` : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;