import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Weather = ({ capital }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {

    const weatherURL =
      `http://api.weatherstack.com/current?` +
      `access_key=${process.env.REACT_APP_API_KEY}&` +
      `query=${capital}&` +
      `units=m`

    axios
      .get(
        weatherURL
      )
      .then(response => {
        setWeather(response.data.current)
      })
  }, [capital])


  return weather ?
    (
      <div>

        <div>
          {weather.weather_descriptions.map(description =>
            <p key={description}>
              {description}
            </p>)}
        </div>

        <div>
          <p>
            <b>Temperature </b>
            {weather.temperature} &#176;C
          </p>
        </div>

        <div>
          {weather.weather_icons.map(icon =>
            <img
              key={icon}
              src={icon}
              alt=''
            />)}
        </div>

        <div>
          <p>
            <b>Wind </b>{weather.wind_speed} km/h, direction {weather.wind_dir}
          </p>
        </div>

      </div>
    )
    :
    (
      <div>Fetching weather...</div>
    )
}


export default Weather