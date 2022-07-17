import CountryDetails from './CountryDetails'



const ShowFiltered = ({ filteredCountries, setFilter, selectedCountry, setSelectedCountry }) => {

  const handleClick = (country => {
    setSelectedCountry(country)
  })


  if (filteredCountries.length === 1) {
    return (
      <CountryDetails country={filteredCountries[0]} />
    )
  }

  if (selectedCountry) {
    return (
      <CountryDetails country={selectedCountry} />
    )
  }

  if (filteredCountries.length < 10) {
    return (
      <table>
        <tbody>
          {filteredCountries.map(country => (
            <tr key={country.name.common}>
              <td>{country.name.common}</td>
              <td><button onClick={() => handleClick(country)}>view</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  if (!filteredCountries) { return <p>No matches</p> }

  return <p>Too many matches, please specify another filter</p>
}


export default ShowFiltered