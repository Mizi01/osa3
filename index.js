
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

/*tehtävä 3.9*/

let persons = [
    {
        id: 1,
        name: "Jaska Jokunen",
        number: 1056846156
    },
    {
        id:2,
        name: "Matti Meikäläinen",
        number: 5615684866
    },
    {
        id:3,
        name: "John Doe",
        number: 418848445
    }
    ]

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

      /*app.get('/api/persons/:id', morgan('tiny'), (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)
        if (person) {
            response.json(person)
        }else{
            response.status(404).end()
        }
      })*/

      app.get('/api/persons/:id', (request, response) => {
        Person.findById(request.params.id).then(note => {
          response.json(note)
        })
      })

      app.delete('/api/persons/:id', morgan('tiny'), (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)
      
        response.status(204).end()
      })

      /*app.post('/api/persons', morgan('tiny'), (request, response) => {
        const body = request.body
        console.log(body.name)

        if(!body.name) {
            return response.status(400).json({
                error: 'name missing'
            })
        }

        console.log(persons.map(name => name.name))

        if(!body.name || !body.number) {
            return response.status(400).json({
                error: 'number missing'
            })
        }
        
        if(persons.map(name => name.name).includes(body.name)) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
        
        const person = {
            name: body.name,
            number: body.number,
            id: Math.floor(Math.random()*(10000000-1)+1)
        }
        console.log(person)
        persons = persons.concat(person)
        response.json(person)
      })*/

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
      
      const PORT = process.env.PORT || 3001
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })