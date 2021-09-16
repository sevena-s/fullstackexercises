const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const PhoneBook = require('./models/phone')

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors())
app.use(express.static('build'))

let persons = [
  {
    "id": 1,
    "name": "Art Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    
  })

app.get('/api/persons', (request, response) => {
    PhoneBook.find({}).then(persons => {
      response.json(persons)
    })
  })

app.get('/info', (request, response) => {
    response.send(
        `<div>Phonebook has info for ${PhoneBook.length} people
        <p>${new Date()} </p></div>`
        )
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })  

const generateID = () => {
    return Math.floor(Math.random() * 1000)
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'Name or Number Missing' 
        })
      }
    
    if(persons.map(person => person.name).includes(body.name)){
        return response.status(400).json({ 
            error: 'Name must be unique' 
        })
    }
    
    const person = new PhoneBook({
        id: generateID(),
        name: body.name,
        number: body.number,
      })
    
      //persons = persons.concat(person)
    
      person.save().then(savedPerson => {
        response.json(savedPerson)
      })
})


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)