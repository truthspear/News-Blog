import './Weather.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = () => {
  const [data, setData] = useState([])
  const [location, setLocation] = useState("")

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "Greater Noida"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocationlocation}&units=Metric&appid=4162b2367849996832f6be37aa104a24`
      
      const response = await axios.get(url)
      setData(response.data)

    }
    fetchDefaultLocation()
  }, [])

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=4162b2367849996832f6be37aa104a24`

    const response = await axios.get(url)

    setData(response.data)
    setLocation("")

    
  }

  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return <i className='bx-sun-bright'></i>
      case 'Clouds':
        return <i className='bx-cloud'></i>
      case 'Rain':
        return <i className='bx-cloud-rain'></i>
      case 'Snow':
        return <i className='bx-cloud-snow'></i>
      case 'Thunderstorm':
        return <i className='bx-cloud-lightning'></i>
      case 'Haze':
      case 'Mist':
        return <i className='bx-cloud-fog'></i> 
      default:
        return <i className='bx-cloud'></i>     
  }
}  

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <div className="location-group">
            <div className="location-line">
              <i className="fa-solid fa-location-dot"></i>
              <div className="location">{data.name}</div>
            </div>
            <div className="search-location">
              <input type="text" placeholder="Enter Location" value={location} onChange={handleInputChange}
              onKeyDown={handleKeyPress}/>
              <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
            </div>
          </div>
        </div>


        <div className="weather-data">
          {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)}
          <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
          <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null }</div>

        </div>
      </div>
    </div>
  );
}

export default Weather