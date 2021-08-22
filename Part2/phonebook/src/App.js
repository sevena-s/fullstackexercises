import React,{useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas'
    }
  ])

  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(numberObject))
    setNewName('')
  }

  const handleNewNumber = (event) => {
    setNewName(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit= {addNumber}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNewNumber}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(number =>
        <Numbers key={number.name} number ={number} /> )}
    </div>
  )


}

const Numbers = ({number}) => {
  return(
    <p>{number.name}</p>
  )
}

export default App;
