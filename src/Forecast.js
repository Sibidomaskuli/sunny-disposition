import React, {useState} from "react";
import WeatherInfo from "./WeatherInfo";
import DailyForecast from "./DailyForecast";
import Footer from "./Footer";
import axios from "axios"; 
import "./Forecast.css";

export default function Forecast (props){
  const [weatherData, setWeatherData] = useState({ ready: false});
  const [city, setCity] = useState(props.defaultCity);
 
  function displayResult(response) {     
   setWeatherData({    
    ready: true,
    coordinates: response.data.coord,
    temperature: Math.round(response.data.main.temp),
    pressure: response.data.main.pressure, 
    date: new Date(response.data.dt * 1000),
    humidity: response.data.main.humidity,
    wind: Math.round(response.data.wind.speed),
    city: response.data.name,
    description: response.data.weather[0].description,
    precipitation: response.data.clouds.all,
    icon: response.data.weather[0].icon, 
   });
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  
  function updateCity(event) {
  setCity(event.target.value);
 }
  
 function search() {
  const key="64c64ffadfe4c3d751ef8a44c2608885";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayResult);   
 }
  
  if (weatherData.ready) {
   return (
    <div className="card">
     <div className="card-body">
      <h3>Weather Search</h3>
      <form onSubmit={handleSubmit}>
       <div className="row">
        <div className="col-10">
         <input
          type="search"
          placeholder="Enter a city.."
          className="form-control"
          autoFocus="on"
          onChange={updateCity}
         />
        </div>
        <div className="col-2">
         <input
          type="submit"
          value="Search"
          className="btn btn-info w-100"
         />
        </div>
       </div>
      </form>
      <WeatherInfo data={weatherData} />
      <DailyForecast coordinates={weatherData.coordinates} />
     </div>
     <Footer />
    </div>
   ); 
  } else {
    search();
    return "Loading..."; 
  }
}