import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Chennai");  // Default city
  const [lat, setLat] = useState(13.0827);  // Latitude for Chennai
  const [lon, setLon] = useState(80.2707);  // Longitude for Chennai

  const API_KEY = "94256124b60a1afd523d8da129a3cc60";  // Your valid API key

  const cities = [
    { name: "Chennai", lat: 13.0827, lon: 80.2707 },
    { name: "Madurai", lat: 9.9395, lon: 78.1218 },
    { name: "Coimbatore", lat: 11.0168, lon: 76.9558 },
    { name: "Trichy", lat: 10.7905, lon: 78.7045 },
    { name: "Salem", lat: 11.6643, lon: 78.1460 },
    { name: "Tirunelveli", lat: 8.7277, lon: 77.7047 },
    { name: "Erode", lat: 11.3400, lon: 77.7160 },
    { name: "Vellore", lat: 12.9165, lon: 79.1320 },
    { name: "Pondicherry", lat: 11.9416, lon: 79.8083 }
  ];

  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(URL);
        setForecast(response.data.list); // 'list' contains 3-hour interval data
      } catch (err) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [URL]);  // Re-fetch data when the URL changes

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    const cityData = cities.find((city) => city.name === selectedCity);
    setCity(selectedCity);
    setLat(cityData.lat);
    setLon(cityData.lon);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1> Arpudha 5-Day / 3-Hour Weather Forecast</h1>

      {/* Dropdown for selecting city */}
      <select value={city} onChange={handleCityChange} style={{ padding: "10px", margin: "20px" }}>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {forecast.map((entry, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              margin: "8px",
              width: "150px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{new Date(entry.dt * 1000).toLocaleString()}</h3>
            <p>Temp: {entry.main.temp}°C</p>
            <p>Humidity: {entry.main.humidity}%</p>
            <p>{entry.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
