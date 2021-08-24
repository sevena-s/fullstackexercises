import { useState, useEffect } from "react";
import axios from 'axios'

const App = () => {

  const [newSearch, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [checker, setChecker] = useState(false)

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
  {checker ? (countries.filter(country => country.name.includes(newSearch))).map(country => 
  <p key={country.name}> {country.name}</p>) : countries.map(country =>
    <p key={country.name}> {country.name}</p>)}
  </div>
  )
}

export default App;
