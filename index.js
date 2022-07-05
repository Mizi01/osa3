
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())


/*tehtävä 3.16*/

let persons = []
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

    const message = `<h>Phonebook has info for ${persons.length} people</h><div>${Date()}`


    app.get('/info', morgan('tiny'), (req, res) => {
        res.send(message)
        console.log("moi")
      })
      
      app.get('/api/persons', morgan('tiny'), (req, res) => {
        Person.find({}).then(persons => {
            res.json(persons)
        })
      })

      app.get('/api/persons/:id', morgan('tiny'), (request, response, next) => {
        Person.findById(request.params.id).then(person => {
          if (person) {
            response.json(person)
          } else {
            console.log("person not foundd")
            response.status(404).end()
          }
        })
        .catch(error => next(error))
      })

      app.delete('/api/persons/:id', morgan('tiny'), (request, response, next) => {
        Person.findByIdAndRemove(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error => next(error))
      })

      app.post('/api/persons', (request, response) => {
        const body = request.body
        if (body.name === undefined) {
            return response.status(400).json({ error: 'content missing' })
          }
        
          const person = new Person({
            name: body.name,
            number: body.number,
          })
        
          person.save().then(savedPerson => {
            response.json(savedPerson)
          })
      })

      app.use(errorHandler)
      
      const PORT = process.env.PORT || 3001
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })