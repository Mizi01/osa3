const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

/*tehtävä 3.8*/

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
        res.json(persons)
      })

      app.get('/api/persons/:id', morgan('tiny'), (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)
        if (person) {
            response.json(person)
        }else{
            response.status(404).end()
        }
      })

      app.delete('/api/persons/:id', morgan('tiny'), (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)
      
        response.status(204).end()
      })

      app.post('/api/persons', morgan('tiny'), (request, response) => {
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
      })
      
      const PORT = 3001
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })