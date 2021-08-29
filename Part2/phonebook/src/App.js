import React,{useState, useEffect} from 'react'
import axios from 'axios'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
/*  useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  */

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [checker, setChecker] = useState(false)

  const hook = () => {
    console.log('effect')
    axios 
      .get('http://localhost:3001/persons')
      .then(response =>{
        console.log('promise fulfilled')
        setPersons(response.data)
      })

  }
  useEffect(hook, [])

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber
    }

    const check = persons.map(phone => phone.name).includes(newName) ?
    null:
    numberService
      .create(numberObject)
      .then(reponse => {
      setPersons(persons.concat(numberObject))
      setNewName('')
      setNewNumber('')
      })
  }

  const addSearch = (event) => {
    event.preventDefault()
    const test = persons.map(phone => phone.name)
    setChecker(test.some(a=>a.includes(newSearch)))

    console.log(checker)
    console.log(newSearch)

    setSearch('')

  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearch(event.target.value)
  }

  console.log(newSearch)

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit= {addSearch}>
        <div>
          Search Names with: <input 
          value={newSearch}
          onChange={handleSearchName}
          />
        </div>
      </form>
      <h2>Add New Number</h2>
      <form onSubmit= {addNumber}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNewName}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type='submit' onClick= {() => (persons.map(number => number.name).includes(newName))
          ? window.alert(newName + ' is already added')
          : persons}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {console.log(newSearch)}
      {checker ? (persons.filter(person => person.name.includes(newSearch))).map(phone => <Numbers key={phone.name} number ={phone} /> ) : persons.map(phone => <Numbers key= {phone.name} number= {phone} />)}
    </div>
  )


}

const Numbers = ({number}) => {
  return(
    <p>{number.name} {number.number}</p>
  )
}

export default App;
