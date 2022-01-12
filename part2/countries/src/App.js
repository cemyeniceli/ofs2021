import {useEffect, useState, } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import SearchResults from './components/SearchResults';

const App = () => {
  

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [country, setCountry] = useState({})

  const getAllCountryData = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const handleFilterChange = (event) => {
    setCountry({})
    setNewFilter(event.target.value)
  }

  const handleShowButton = (country) => {
    const handler = () => setCountry(country)
    return handler
  }

  useEffect(getAllCountryData,[])
  
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <SearchResults countries={filteredCountries} searchTerm={newFilter} handleShowButton={handleShowButton} selectedCountry={country}/>
    </div>
    )
}

export default App;
