import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VITE_OPENWEATHER_API_KEY } from '../env';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('London');
  const [searchInput, setSearchInput] = useState('');

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      if (!VITE_OPENWEATHER_API_KEY) {
        throw new Error('OpenWeather API key is not configured');
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${VITE_OPENWEATHER_API_KEY}`
      );
      setWeather(response.data);
      setLocation(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
      setSearchInput('');
    }
  };

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!weather) return null;

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
        <h5 className="card-title">Weather in {weather.name}</h5>
        <div className="d-flex align-items-center">
          {weather.weather[0].icon && (
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="me-3"
            />
          )}
          <div>
            <p className="mb-1">Temperature: {Math.round(weather.main.temp)}°C</p>
            <p className="mb-1">Humidity: {weather.main.humidity}%</p>
            <p className="mb-0 text-capitalize">{weather.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather; 