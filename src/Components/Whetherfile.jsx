import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import search_logo from '../assets/images/search.png'
import cloudy_logo from '../assets/images/cloud.png'
import rainy_logo from '../assets/images/rain.png'
import snow_logo from '../assets/images/snow.png'
import sunny_logo from '../assets/images/clear.png'
import drizzy_logo from '../assets/images/drizzle.png'
import hum_logo from '../assets/images/humidity.png'
import wind_logo from '../assets/images/wind.png'
import { API_KEY } from '../apiKey'

export const API = process.env.REACT_APP_WEATHER_API_KEY;

const Whetherfile = () => {

const allIcons = {
"01d": sunny_logo,
"01n": sunny_logo,
"02d": cloudy_logo,
"02n": cloudy_logo,
"03d": cloudy_logo,
"03n": cloudy_logo,
"04d": drizzy_logo,
"04n": drizzy_logo,
"09d": rainy_logo,
"09n": rainy_logo,
"10d": rainy_logo,
"10n": rainy_logo,
"13d": snow_logo,
"13n": snow_logo,
};

  const [weatherData, setWeatherData]=useState(null);
  const inputRef = useRef() ;

  useEffect(()=>{
    fetchData("");
  },[]);

  const fetchData = async (city)=>{
   if(city === ""){
      alert("Enter City name!")
      return;
   }
   try{
    const search = await axios.get(API, {
      params:{q: city, 
         appid: API_KEY,
      units: "metric",
      },
    });

    const data = search.data ;
    console.log("Search",data);

    const icon=allIcons[data.weather?.[0]?.icon] || sunny_logo;

    setWeatherData({
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed,
      temperature: data.main?.temp,
      location: data.name,
      icon: icon,
      mains: data.weather?.[0]?.main,
    });


   } catch(error){
      console.log("error feaching data:",error);
      setWeatherData(false);
   }
  };

  return (
    
  <div className="flex justify-center items-center min-h-screen bg-emerald-700 w-full px-4 py-6 sm:px-0">
      <div className="flex flex-col items-center w-full max-w-md gap-5 shadow-2xl shadow-indigo-800 bg-gradient-to-r from-[#2f4680] to-[#500ae4] p-5 sm:p-6 sm:pt rounded-2xl">

        {/* Search Bar */}
        <div className="flex items-center justify-center gap-2 w-full">
          <input
            ref={inputRef}
            className="py-3 px-4 w-full sm:w-auto outline-none border-2 rounded-2xl font-semibold text-xl bg-gray-200 text-emerald-700 border-gray-800"
            type="text"
            placeholder="enter city:"
          />

          <img
            className="h-12 w-12 border-2 cursor-pointer rounded-full p-2 bg-gray-200 border-gray-600 hover:scale-105 transition"
            src={search_logo}
            alt="search"
            onClick={() => fetchData(inputRef.current.value)}
          />
        </div>

        {weatherData ? (
          <>
            {/* Weather Icon */}
            <div className="flex justify-center items-center">
              <img id="icon" className="w-32 sm:w-60" src={weatherData?.icon} alt="" />
            </div>

            {/* Weather Main Status */}
            <p className="text-xl sm:text-2xl text-amber-100 font-bold text-center">
              {weatherData?.mains}
            </p>

            {/* Temperature */}
            <h1 className="text-emerald-800 bg-amber-100 text-4xl sm:text-6xl font-bold mt-1 shadow-lg shadow-gray-600 p-2 rounded-bl-2xl rounded-tr-2xl">
              {Math.round(weatherData?.temperature)} °C
            </h1>

            {/* Location */}
            <p className="text-3xl sm:text-5xl font-semibold text-white text-center">
              {weatherData?.location}
            </p>

            {/* Humidity & Wind */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 w-full mt-4">

              {/* Humidity */}
              <div className="flex gap-3 bg-amber-100 shadow-lg shadow-gray-600 p-2 rounded-lg items-center">
                <img
                  className="h-10 w-10 bg-amber-950 p-1 rounded"
                  src={hum_logo}
                  alt=""
                />
                <div className="text-emerald-900 font-semibold text-xl">
                  <p>{weatherData?.humidity}%</p>
                  <span className="text-base">Humidity</span>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="flex gap-3 bg-amber-100 shadow-lg shadow-gray-600 p-2 rounded-lg items-center">
                <img
                  className="h-10 w-10 bg-amber-950 p-1 rounded"
                  src={wind_logo}
                  alt=""
                />
                <div className="text-emerald-900 font-semibold text-xl">
                  <p>{weatherData?.windSpeed} Km/h</p>
                  <span className="text-base">Wind Speed</span>
                </div>
              </div>

            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Whetherfile


