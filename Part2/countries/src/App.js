import { useState, useEffect } from "react";
import axios from 'axios'
import { array } from "prop-types";

const api_key = process.env.REACT_APP_API_KEY

const App = () => {

  const [newSearch, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [checker, setChecker] = useState(true)
  const [capital, setCapital] = useState('New York')
  const [weather, setWeather] = useState([])

  const hookWeather = () => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }
  useEffect(hookWeather,[capital])

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook,[])
  const array = (countries.filter(country => country.name.includes(newSearch)))

  const addSearch = (event) => {
    event.preventDefault()
    const test = countries.map(country => country.name)
    setChecker(test.some(a=>a.includes(newSearch)))
    if(array.length === 1){
      setCapital(array.map(cap => cap.capital))
    }
  }

  const handleSearchName = (event) => {
    setSearch(event.target.value)
  }
  console.log(newSearch)


  return(
  <div>
  <form onChange= {addSearch}>
    <div>
      Search countries: <input 
      value={newSearch}
      onChange={handleSearchName}
      />
    </div>
  </form>
    <CheckOneCountry checker= {checker} countries= {countries} newSearch= {newSearch} array= {array} weather= {weather}/>
  </div>
  )
}

const CheckOneCountry = ({checker, countries, newSearch, array, weather}) => {

  return(
    <div>
      {(array.length === 1) ?
      (<OneCountryDisplay array= {array} weather= {weather}/>)
      :(<CheckCountryDisplay checker= {checker} countries= {countries} newSearch= {newSearch} array= {array} weather= {weather}/>)}
    </div>
  )
}

const DisplayWeather = ({array, weather}) => {
  const cap = array.map(country => country.capital)
  const image = weather.current.weather_icons
  console.log(weather)

  return(
    <div>
      <h1>Weather in {cap}</h1>
      <p>Temperature: {weather.current.temperature}</p>
      <img src={image} style={{ height: 125, width: 125 }}/>
      <p>Wind: {weather.current.wind_speed} mph Direction {weather.current.wind_dir}</p>
    </div>
  )
}

const OneCountryDisplay = ({array, weather}) => {
  console.log(array)
  const flag = array.map(country => country.flag)

  return(
    <div>
      <h1>{array.map(country => country.name)}</h1>
      <p>Capital: {array.map(country => country.capital)}</p>
      <p>Population: {array.map(country => country.population)}</p>
      <h1>Languages</h1>
      {array.map((item, index) => (
        <div key={index}>
        {item.languages.map((c, i) => (
          <div key={i}>
          <li>{c.name}</li>
          </div>
        ))}
        </div>
      ))}
      <p></p>
      <img src={flag} style={{ height: 125, width: 125 }}/>
      <p></p>
      <DisplayWeather array= {array} weather= {weather}/>
    </div>
  )
}

const CheckCountryDisplay = ({checker, countries, newSearch, array, weather}) => {
  return(
    <div>
      {(array.length>10) ?
      <p>Too many countries!</p>
      : (
      <CheckSearch checker= {checker} countries= {countries} newSearch= {newSearch} weather= {weather}/>
      )}

    </div>
  )
}

const CheckSearch = ({checker, countries, newSearch, weather}) => {
  return(
  <div>
  {checker ? (countries.filter(country => country.name.includes(newSearch))).map(country => 
    <p key={country.name}> {country.name} <Button array= {[country]} weather= {weather}/></p>) : countries.map(country =>
      <p key={country.name}> {country.name}</p>)}
  </div>
  )
}

const Button = ({array, weather}) => {
  const [showAll, setShowAll] = useState(false)

  return(
    <div>
    <button onClick={() => {
      (setShowAll(!showAll));
    }}>
      show
    </button>
    {showAll ?
      <div> 
      <OneCountryDisplay array= {array} weather= {weather}/>
      </div>
      :null} 
    </div>
  )
}

export default App;
