const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const PhoneBook = require('./models/phone')

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

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

app.get('/api/persons/:id', (request, response, next) => {
    PhoneBook.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log("Error Id")
      next(error)
    })
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

app.delete('/api/persons/:id', (request, response, next) => {
    PhoneBook.findByIdAndRemove(request.params.id).then(person => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })  

const generateID = () => {
    return Math.floor(Math.random() * 1000)
}

const generateColor = () => {
  let colors = ["#2493FF", "#FFC224", "#A4D05F", "#FF6624"]
  return colors[Math.floor(Math.random() * 4)];
}
  
app.post('/api/persons', (request, response, next) => {
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
        color: body.color,
        runValidators: true
      })
    
      person.save().then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  PhoneBook.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)