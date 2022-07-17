import { useEffect, useState } from 'react'
import axios from 'axios'


const Weather = ({ capital, capitalCoords }) => {
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    const weatherURL =
      `https://api.openweathermap.org/data/2.5/weather?` +
      `lat=${capitalCoords[0]}&` +
      `lon=${capitalCoords[1]}&` +
      `units=metric&` +
      `appid=${process.env.REACT_APP_API_KEY}`

    axios
      .get(
        weatherURL
      )
      .then(response => {
        setWeather(response.data)

      })
      .catch(e => {
        console.log(e)
      })
  }, [ capitalCoords ])


  return (
    weather ? (
      <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature {weather.main.temp} &#176;C</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="aap"  />
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )
      : <div>Fetching weather....</div>)
}


export default Weather