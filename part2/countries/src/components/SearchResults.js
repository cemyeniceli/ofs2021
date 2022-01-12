import React from "react";
import CountryDetails from "./CountryDetails";

const Result = ({country, onShow}) => {
  return (
    <div>
      {country.name.common}
      <button onClick={onShow(country)}>show</button>
    </div>
  )
}

const SearchResults = ({countries, searchTerm, handleShowButton, selectedCountry}) => {
  const numberOfResults = countries.length
  const isCountrySelected = Object.keys(selectedCountry).length > 0
  
  if (searchTerm === '' || numberOfResults === 0) {
    return(
      <div>No search result</div>
    )  
  } else if (numberOfResults > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  } else if (numberOfResults > 1) {
      if (isCountrySelected){
        return(
          <div>
              {countries.map((country) => <Result key={country.ccn3} country={country} onShow={handleShowButton}/>)}
              <CountryDetails country={selectedCountry} />
          </div>
        )
      } else {
        return(
          <div>
            {countries.map((country) => <Result key={country.ccn3} country={country} onShow={handleShowButton}/>)}
          </div>
        )  
      }  
  } else if (numberOfResults === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }
}

export default SearchResults