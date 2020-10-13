import React from 'react'

import Weather from './Weather.js'

const Country = ({ country }) => {

  return (
    <div>
      <h1>{country.name}</h1>
      Capital {country.capital}
      <br />
      Population {country.population}
      <br />
      Area {country.area} km&#178;
      <br />
      Currency {country.currencies.map(currency => currency.name).join(', ')}
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => {
          return (
            <li
              key={language.name}>
              {language.name}
            </li>)
        })}
      </ul>
      <img
        src={country.flag}
        alt={"Flag of " + country.name}
        width="150px"
      />
      <h2>Weather in {country.capital}</h2>
      <Weather capital={country.capital} />

    </div>
  )
}


export default Country

