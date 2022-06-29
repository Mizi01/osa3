const express = require('express')
const app = express()

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
        number: 418848444
    }
    ]

    const message = `<h>Phonebook has info for ${persons.length} people</h><div>${Date()}`


    app.get('/info', (req, res) => {
        res.send(message)
        console.log("moi")
      })
      
      app.get('/api/persons', (req, res) => {
        res.json(persons)
      })

      app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)
        if (person) {
            response.json(person)
        }else{
            response.status(404).end()
        }
      })
      
      const PORT = 3001
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })