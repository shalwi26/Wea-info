import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const [cityInput, setCityInput] = useState('');
    // const allIcons={
    //     "01d":
    // }
    const search = async (city)=>{
        try{
            const url= `https://wttr.in/${city}?format=j1`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const current = data.current_condition[0];
            setWeatherData({
              humidity: current.humidity,
              windSpeed: current.windspeedKmph,
              temperature: Math.floor(current.temp_C),
              location: city
            })
        } catch (error){

        }

    }
    useEffect(()=>{
        search("Patna")
    },[])
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input 
          type="text"
          placeholder='search'
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}/>
        <img
          src={search_icon}
          alt="Search"
          onClick={() => {
            if (cityInput.trim()) {
              search(cityInput.trim()); // 👈 triggers weather search
              setCityInput(''); // Optional: clear input after search
            }
          }}
            />
      </div>
      <img src={clear_icon} alt="" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Weather
