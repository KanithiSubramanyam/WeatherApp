export default function WeatherCard(props) {
  const countryName = {
    in: "India",
    us: "United States Of America",
  };

  return (
    <div className="weather-cards-grid">
      {props.weatherData.map((data) => (
        <div key={data.zipcode} className="weather-card card">
          <div className="card-body">
            <h5 className="card-title">{data.area}</h5>
            <p className="weather-zipcode">{data.zipcode}</p>
            <span className="weather-country">{countryName[data.country]}</span>
            <p className="weather-temperature">{data.temprature}°C</p>
            <p className="weather-description">{data.weatherDescription}</p>
            <div className="weather-stats">
              <div className="weather-stat">
                <span className="weather-stat-label">Wind</span>
                <span className="weather-stat-value">{data.windSpeed} m/s</span>
              </div>
              <div className="weather-stat">
                <span className="weather-stat-label">Humidity</span>
                <span className="weather-stat-value">{data.humidity}%</span>
              </div>
            </div>
            <div className="weather-card-footer">
              <p className="weather-last-update">
                <small>{data.lastUpdate}</small>
              </p>
              <p className="refresh-btn" onClick={() => props.onRefresh(data.zipcode)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 30 30"
                >
                  <path d="M 15 3 C 12.053086 3 9.3294211 4.0897803 7.2558594 5.8359375 A 1.0001 1.0001 0 1 0 8.5449219 7.3652344 C 10.27136 5.9113916 12.546914 5 15 5 C 20.226608 5 24.456683 8.9136179 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.441216 7.8348596 21.297943 3 15 3 z M 4.3007812 9 L 0.30078125 15 L 3 15 C 3 21.635519 8.3644809 27 15 27 C 17.946914 27 20.670579 25.91022 22.744141 24.164062 A 1.0001 1.0001 0 1 0 21.455078 22.634766 C 19.72864 24.088608 17.453086 25 15 25 C 9.4355191 25 5 20.564481 5 15 L 8.3007812 15 L 4.3007812 9 z"></path>
                </svg>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
