import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'


const App = () => {

  const [countries, setCountries] = useState([])
  const [filterBy, setFilterBy] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleClick = (event) => {
    setFilterBy(event.target.attributes.country.value)
  }


  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value)
  }


  const filteredCountries
    = countries.filter(e => {
      return (e.name.toLowerCase().includes(filterBy.toLowerCase().trim()))
    })


  return (
    <div>
      Find countries
      <input
        value={filterBy}
        onChange={handleFilterByChange}
      />
      <ShowCountries
        filteredCountries={filteredCountries}
        // countries={countries}
        handleClick={handleClick}
        setFilterBy={setFilterBy}
      />
    </div>
  )
}


export default App;
