import React from 'react'
import Country from './Country'
import CountryList from './CountryList'


const ShowCountries = ({ filteredCountries, handleClick, setFilterBy }) => {

  if (!filteredCountries.length) {
    return (<div><br />No matches, please specify another filter</div>)
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }

  if (filteredCountries.length <= 10) {
    return (
      <CountryList
        countries={filteredCountries}
        handleClick={handleClick}
        setFilterBy={setFilterBy}
      />
    )
  }

  return (<div><br />Too many matches, please specify another filter</div>)
}


export default ShowCountries