import React,{useState, useEffect} from 'react'
import axios from 'axios'
import numberService from './services/Numbers'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [checker, setChecker] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageColor, setMessageColor] = useState("added")

  const hook = () => {
    console.log('effect')
    numberService
      .getAll()
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
        setErrorMessage(
        `${newName} has been added`
        )
        setMessageColor("added")
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
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

  const handleSameName = (event) => {
    const numberObject = {
      name: newName,
      number: newNumber
    }

    if(persons.map(number => number.name).includes(newName)){
    const numberArray = (persons.map(nums => nums.number))
    const nameArray = (persons.map(names => names.name))
    const index = nameArray.indexOf(newName)

    console.log(index)
    console.log(persons[index].id)
    const sames = (numberArray[index] !== (newNumber))
          ? window.confirm(`Would you like change ${newName}'s number?`) ?
          numberService
            .update(persons[index].id,numberObject)
            .then(response =>{ 
              setErrorMessage(
              `${newName} has been added`
              )
              setTimeout(() => {
              setErrorMessage(null)
              }, 5000)
              window.location.reload()
            })
            .catch(error => {
              setErrorMessage(
                `${newName} has already been removed from the server`
                )
                setMessageColor("error")
                setTimeout(() => {
                setErrorMessage(null)
                }, 5000)})
          : null
          : window.alert(newName + ' is already added')
    }
    else{
      setPersons(persons)
    }
    console.log(newNumber)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} color={messageColor}/>
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
          <button type='submit' onClick= {handleSameName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {console.log(newSearch)}
      {checker ? (persons.filter(person => person.name.includes(newSearch))).map(phone => <Numbers key={phone.name} number ={phone} id={phone.id} person={phone.name}/> ) : persons.map(phone => <Numbers key= {phone.name} number= {phone} id={phone.id} person={phone.name}/>)}
    </div>
  )


}

const Numbers = ({number,id, person}) => {
  return(
    <div>
    <p>{number.name} {number.number}</p>
    <button onClick={() => 
      window.confirm(`Are you Sure you want to delete ${person}?`) ?
        numberService
          .deleteNumber(id)
          .then(window.location.reload()) 
        : null
    }>Delete</button>
    </div>
  )
}

export default App;
