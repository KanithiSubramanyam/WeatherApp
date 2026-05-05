const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const weatherUrl = import.meta.env.VITE_APP_WEATHER_URL;

export const WeatherData = async (data) => {
  const weather = await fetch(
    `${weatherUrl}?zip=${data.zipcode},${data.country}&appid=${apiKey}&units=metric`,
  );

  if (!weather.ok) {
    throw new Error("Failed to fetch weather");
    alert('Entered zipcode is not valid')
  }
  const weatherData =await weather.json();

  const mainData = {
      zipcode : data.zipcode,
      country : data.country,
      area : weatherData.name,
      temprature : weatherData.main.temp,
      humidity : weatherData.main.humidity,
      windSpeed : weatherData.wind.speed,
      weatherDescription : weatherData.weather[0].main,
      lastUpdate : Date().toString(),
    }
  return mainData;
};
