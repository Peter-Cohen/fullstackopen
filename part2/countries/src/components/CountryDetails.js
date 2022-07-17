import Weather from "./Weather.js"

const CountryDetails = ({ country }) => {

  const weatherElement = ('latlng' in country.capitalInfo) ?
    <Weather
      capital={country.capital[0]}
      capitalCoords={country.capitalInfo.latlng}
    />
    : <p>No weather info availabe</p>


  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Population: {new Intl.NumberFormat().format(country.population)}</p>
      <p>Capital: {country.capital[0]}</p>
      <p>Surface area: {new Intl.NumberFormat().format(country.area)} km&#178;</p>
      <b>Languages:</b>
      <ul>
        {Object.keys(country.languages).map(languageKey => {
          return (
            <li
              key={languageKey}>
              {country.languages[languageKey]}
            </li>)
        })}
      </ul>
      <img
        src={country.flags.png}
        width="150px"
        alt={"Flag of " + country.name}
      />

      {weatherElement}

    </div>
  )
}


export default CountryDetails