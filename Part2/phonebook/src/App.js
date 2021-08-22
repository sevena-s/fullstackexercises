import React,{useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '604'
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber
    }

    const check = persons.map(phone => phone.name).includes(newName) ?
    null:
    setPersons(persons.concat(numberObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(phone =>
        <Numbers key={phone.name} number ={phone} /> )}
    </div>
  )


}

const Numbers = ({number}) => {
  return(
    <p>{number.name} {number.number}</p>
  )
}

export default App;
