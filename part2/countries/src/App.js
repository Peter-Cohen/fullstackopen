import { useState, useEffect } from 'react'
import axios from 'axios'

import ShowFiltered from './components/ShowFiltered'


function App() {

  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ selectedCountry, setSelectedCountry ] = useState(null)

  useEffect(
    () => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
    },
    []
  )


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase().trim())
  })


  return (
    <div>
      <div>
        Find countries:
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>    
      <ShowFiltered 
        filteredCountries={filteredCountries}
        setFilter={setFilter} 
        selectedCountry={selectedCountry} 
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
}


export default App