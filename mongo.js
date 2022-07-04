const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const dataBaseName = 'phoneBook'

const url = `mongodb+srv://Mizi91:${password}@mizicluster.wd8cw.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`

mongoose.connect(url)

const peopleSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', peopleSchema)

const person = new Person({
    name: 'Matti Meikäläinen',
    number: '04518621893',
})

person.save().then(result => {
    console.log('person saved')
    mongoose.connection.close()
})