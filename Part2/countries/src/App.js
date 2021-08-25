import { useState, useEffect } from "react";
import axios from 'axios'
import { array } from "prop-types";

const App = () => {

  const [newSearch, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [checker, setChecker] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook,[])

  const addSearch = (event) => {
    event.preventDefault()
    const test = countries.map(country => country.name)
    setChecker(test.some(a=>a.includes(newSearch)))

    console.log(checker)
    setSearch('')
  }

  const handleSearchName = (event) => {
    setSearch(event.target.value)
  }
  console.log(newSearch)
  const array = (countries.filter(country => country.name.includes(newSearch)))
  console.log(array)

  return(
  <div>
  <form onSubmit= {addSearch}>
    <div>
      Search countries: <input 
      value={newSearch}
      onChange={handleSearchName}
      />
    </div>
  </form>
    <CheckOneCountry checker= {checker} countries= {countries} newSearch= {newSearch} array= {array}/>
  </div>
  )
}

const CheckOneCountry = ({checker, countries, newSearch, array}) => {
  return(
    <div>
      {(array.length === 1) ?
      (<OneCountryDisplay array= {array}/>)
      :(<CheckCountryDisplay checker= {checker} countries= {countries} newSearch= {newSearch} array= {array}/>)}
    </div>
  )
}

const OneCountryDisplay = ({array}) => {
  const flag = array.map(country => country.flag)
  return(
    <div>
      <h1>{array.map(country => country.name)}</h1>
      <p>Capital: {array.map(country => country.capital)}</p>
      <p>Population: {array.map(country => country.population)}</p>
      <h1>Languages</h1>
      <img src={flag}/>
    </div>
  )
}

const CheckCountryDisplay = ({checker, countries, newSearch, array}) => {
  return(
    <div>
      {(array.length>10) ?
      <p>Too many countries!</p>
      : (<CheckSearch checker= {checker} countries= {countries} newSearch= {newSearch}/>)}
    </div>
  )
}

const CheckSearch = ({checker, countries, newSearch}) => {
  return(
  <div>
  {checker ? (countries.filter(country => country.name.includes(newSearch))).map(country => 
    <p key={country.name}> {country.name}</p>) : countries.map(country =>
      <p key={country.name}> {country.name}</p>)}
  </div>
  )
}

export default App;
