import { useState, useEffect } from "react";
import axios from "axios"

const Language = (props) => {
  return(
    <li>{props.language}</li>
  )
}

const Country = ({country}) => {
  return(
    <div>
      <h1>
        {country.name.common}
      </h1>
      <div>
        Capital {country.capital[0]}  
      </div>
      <div>
        Area {country.area}
      </div>
      <h3>
        Languages:
      </h3>
      <ul>
        {Object.values(country.languages).map(item =>
          <Language key={item} language={item}/>
        )}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
    </div>
  )
}



const Countries = ({countries, handleClick}) => {
  return(
    <ul>
      {countries.map(item => 
        <li key={item.name.common}>
          {item.name.common}
          <button name={item.name.common} onClick={handleClick}>show</button>
        </li>  
      )}
    </ul>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  const handleClick = (e) => {
    setFilteredCountries(countries.filter(item => item.name.common.toLowerCase().includes(e.target.name.toLowerCase())))
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        console.log(response.data);
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (e) => {
    const search = e.target.value
    setFilteredCountries(countries.filter(item => item.name.common.toLowerCase().includes(search.toLowerCase())));
  }

  return(
    <div>
      Find countries <input onChange={handleCountryChange}/>
      <div>
        {(filteredCountries.length === 1) 
          ? <Country country={filteredCountries[0]}/>
          : (filteredCountries.length > 1 && filteredCountries.length <= 10)
            ? <Countries countries={filteredCountries} handleClick={handleClick}/>
            : (filteredCountries.length > 10 && (document.querySelector("input").value !== ""))
              ? "Too many matches, specify another filter"
              : ""
        }
      </div>
    </div>
  )
}

export default App;
