import React from 'react'



const CountryList = ({ countries, handleClick }) => {
  return (
    <div>
      <br />
      {countries.map(country =>
        <div key={country.name}>
          {country.name}
          <button
            country={country.name}
            onClick={handleClick}
          >
            view
          </button>
        </div>)
      }
    </div >
  )
}




export default CountryList