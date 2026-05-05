import { useState } from "react";
import ModalBox from "./ModalBox";
import WeatherCard from "../Components/WeatherCard";
import weatherImage from "../assets/weather.jpg";
import { WeatherData } from "../Services/GetWeather";

function Dashboard() {
  const [isOpenModal, setIsModal] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  const modal = () => setIsModal(true);

  const addWeatherData = (data) => {
    setWeatherData([...weatherData, data]);
  };

  const refreshWeather = async (zipcode) => {
    const updatedData = await Promise.all(
      weatherData.map(async (item) => {
        if (item.zipcode === zipcode) {
          const newData = await WeatherData(item);
          return {
            ...item,
            temprature: newData.temprature,
            weatherDescription: newData.weatherDescription,
            lastUpdate: newData.lastUpdate,
            humidity: newData.humidity,
            windSpeed: newData.windSpeed,
          };
        }
        return item;
      }),
    );
    setWeatherData(updatedData);
  };

  return (
    <div className="weather-container">
      <img src={weatherImage} className="weather-hero-image" alt="weather background" />

      {!weatherData.length && (
        <div className="weather-empty-overlay">
          <h1 className="weather-app-title">Weather App</h1>
          <p className="weather-app-subtitle">Track weather in your favorite locations</p>
          <button className="add-location-btn" onClick={modal}>
            Add a Location
          </button>
        </div>
      )}

      {weatherData.length > 0 && (
        <div className="weather-dashboard-overlay">
          <div className="weather-dashboard-header">
            <h2 className="weather-dashboard-title">My Locations</h2>
            <button className="add-location-btn" onClick={modal}>
              + Add Location
            </button>
          </div>
          <WeatherCard weatherData={weatherData} onRefresh={refreshWeather} />
        </div>
      )}

      {isOpenModal && (
        <ModalBox
          show={isOpenModal}
          onHide={() => setIsModal(false)}
          addWeatherData={addWeatherData}
          weatherData={weatherData}
        />
      )}
    </div>
  );
}

export default Dashboard;
