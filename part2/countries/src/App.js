import { useState, useEffect } from "react";
import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const Language = (props) => {
  return(
    <li>{props.language}</li>
  )
}

const Country = ({country, data}) => {
  if(Object.entries(data).length > 0){
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
        <h2>
          Weather in {country.capital[0]}
        </h2>
        <div>
          Temperature {data.main.temp} Celcius
        </div>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={"Weather icon"}/>
        <div>
          Wind {data.wind.speed} m/s
        </div>
      </div>
    )
  } else {
    return "Loading..."
  }
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
  const [cityWeather, setCityWeather] = useState({})

  const handleClick = (e) => {
    setFilteredCountries(countries.filter(item => item.name.common.toLowerCase().includes(e.target.name.toLowerCase())))
  }

  useEffect(() => {
    if(filteredCountries.length === 1){
      axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital[0]}&units=metric&APPID=${api_key}`)
      .then(response => {
        setCityWeather(response.data)
      })
    }
  }, [filteredCountries])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
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
          ? <Country country={filteredCountries[0]} data={cityWeather}/> //llamar a axios desde aca?  y dentro do axios llamar a componente? 
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
