import {useEffect, useState, } from 'react';
import axios from 'axios';

const WeatherInfomation = ({weatherData}) => {
  const temperature = weatherData.main.temp.toLocaleString(undefined, {maximumSignificantDigits: 1})
  const capital = weatherData.name
  // Wind speed in mph
  const windSpeed = (weatherData.wind.speed * 2.23694).toLocaleString(undefined, {maximumSignificantDigits: 1})
  const degreesToCompass = (deg) => {
    const compassDirections = ['N','NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']
    const sector = Math.round((deg % 360) / 22.5)
    return compassDirections[sector]
  }
  const windDirection = degreesToCompass(weatherData.wind.deg)
  const weatherIconCode = weatherData.weather[0].icon
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
  const weatherDescription = weatherData.weather[0].description
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>
        <strong>temperature: </strong>{temperature} Celcius
      </div>
      <img src={weatherIconUrl} alt={weatherDescription}/>
      <div>
        <strong>wind: </strong>{windSpeed} mph direction {windDirection}
      </div>
    </div>
  )
}

const CountryDetails = ({country}) => {
  const capital = country.capital[0]
  const countryName = country.name.common

  const [weatherData,setWeatherData] = useState({})

  const getWeatherData = () => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get('http://api.openweathermap.org/data/2.5/weather', {params: {q:capital , units:'metric', appid:api_key}})
      .then(response => {
        setWeatherData(response.data)
        console.log(response.data)
      })
  }

  useEffect(getWeatherData,[capital])
  
  return (
      <div>
        <h2>{countryName}</h2>
        <div>capital {capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {Object.keys(country.languages).map((lang) => {
            return (
              <li key={lang}>{country.languages[lang]}</li>
            )
          })}  
        </ul>
        <img src={country.flags.svg} alt={countryName.concat(' Flag')} width="100" />
        {Object.keys(weatherData).length > 0 ? <WeatherInfomation weatherData={weatherData} /> : null}
      </div>
    )
}

export default CountryDetails