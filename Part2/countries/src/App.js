import { useState, useEffect } from "react";

const App = () => {

  const [newSearch, setSearch] = useState('')

  const addSearch = (event) => {
    event.preventDefault()
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
  </div>
  )
}

export default App;
