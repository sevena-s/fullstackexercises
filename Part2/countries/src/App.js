import { useState, useEffect } from "react";
import axios from 'axios'
import { array } from "prop-types";

const App = () => {

  const [newSearch, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [checker, setChecker] = useState(true)
  const [tester, setTester] = useState(true)

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
    setTester(array.length > 10)

    console.log(checker)
    setSearch('')
  }

  const handleSearchName = (event) => {
    setSearch(event.target.value)
  }
  console.log(newSearch)
  console.log(tester)
  const array = (countries.filter(country => country.name.includes(newSearch)))

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
