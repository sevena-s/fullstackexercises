import React, { useState, useEffect } from 'react'
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

  const generateColor = () => {
    let colors = ["#2493FF", "#FFC224", "#A4D05F", "#FF6624"]
    return colors[Math.floor(Math.random() * 4)];
  }

  const hook = () => {
    console.log('effect')
    numberService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })

  }

  useEffect(hook, [])

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber,
      color: generateColor()
    }

    const check = persons.map(phone => phone.name).includes(newName) ?
      null :
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
        .catch(error => {
          setErrorMessage(`Person Validation Failed: ${newName} must be minimum length(3) & ${newNumber} must be minimum length(8)`)
          setMessageColor("error")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }

  const addSearch = (event) => {
    event.preventDefault()
    const test = persons.map(phone => phone.name)
    setChecker(test.some(a => a.includes(newSearch)))
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
      number: newNumber,
      color: generateColor()
    }

    if (persons.map(number => number.name).includes(newName)) {
      const numberArray = (persons.map(nums => nums.number))
      const nameArray = (persons.map(names => names.name))
      const index = nameArray.indexOf(newName)

      console.log(index)
      console.log(persons[index].id)
      const sames = (numberArray[index] !== (newNumber))
        ? window.confirm(`Would you like change ${newName}'s number?`) ?
          numberService
            .update(persons[index].id, numberObject)
            .then(response => {
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
              }, 5000)
            })
          : null
        : window.alert(newName + ' is already added')
    }
    else {
      setPersons(persons)
    }
    console.log(newNumber)
  }

  return (
    <div class="container">
      <div class="heading">
        <img class="contacts-icon" src={require('./images/contacts.png').default} />
        <h2 class="title">Phonebook</h2>
      </div>
      <Notification message={errorMessage} color={messageColor} />
      <div class="content">
        <div class="contacts">
          <div class="form">
            <form onSubmit={addSearch}>
              <div class="search-container">
                <img class="search-icon" src={require('./images/search-icon.png').default} /> <input
                  class="search-input"
                  value={newSearch}
                  onChange={handleSearchName}
                  placeholder={"Search"}
                />
              </div>
            </form>
          </div>
          <div class="numbers">
            {console.log(newSearch)}
            {checker ? (persons.filter(person => person.name.includes(newSearch))).map(phone => <Numbers key={phone.name} number={phone} id={phone.id} person={phone.name} />) : persons.map(phone => <Numbers key={phone.name} number={phone} id={phone.id} person={phone.name} />)}
          </div>
        </div>
        <div class="add-num">
          <h2 class="new-title">Add New Number</h2>
          <div class="add-form">
            <form class="add-container" onSubmit={addNumber}>
              <div class="input-fields">
                <div class="add-info">
                  <input
                    class="add-input"
                    value={newName}
                    onChange={handleNewName}
                    placeholder={"Name"}
                  />
                </div>
                <div class="add-info">
                  <input
                    class="add-input"
                    value={newNumber}
                    onChange={handleNewNumber}
                    placeholder={"Number"}
                  />
                </div>
              </div>
              <div class="button-container">
                <button class="add-button" type='submit' onClick={handleSameName}>Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const Numbers = ({ number, id, person }) => {
  const firstLetter = (number.name).charAt(0);
  return (
    <div class="item">
      <div style={{ backgroundColor: number.color }} class="profile-icon">{firstLetter}</div>
      <p>{number.name}</p>
      <p class="number">{number.number}</p>
      <div class="delete-container">
        <button class="delete-button" onClick={() =>
          window.confirm(`Are you Sure you want to delete ${person}?`) ?
            numberService
              .deleteNumber(id)
              .then(window.location.reload())
            : null
        }>Delete</button>
      </div>
    </div>
  )
}

export default App;
