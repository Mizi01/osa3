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

    app.get('/', (req, res) => {
        res.send('<h1>Hello World!</h1>')
      })
      
      app.get('/api/persons', (req, res) => {
        res.json(persons)
      })
      
      const PORT = 3001
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })