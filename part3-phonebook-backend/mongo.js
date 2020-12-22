const mongoose = require('mongoose')

const args = process.argv


if (args.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}


const password = args[2]


const url = `mongodb+srv://peter:${password}@cluster0.xz1ic.mongodb.net/phonebook?retryWrites=true&w=majority`


const connect = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
    .then(() => console.log('Connection established'))
}


const disconnect = () => {
  mongoose.connection.close()
    .then(() => console.log('Connection closed'))
}


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


switch (args.length) {
  case 3:
    connect()

    Person.find({})
      .then(result => {
        result.forEach(person => {
          console.log(person)
        })
      })
      .finally(() => {
        disconnect()
      })

    break

  case 4:
    console.log('No number provided.')
    break

  default:
    {
      connect()

      const newPerson = new Person({
        name: args[3],
        number: args[4]
      })

      newPerson.save()
        .then(() => {
          console.log('Entry saved!')
        })
        .finally(() => {
          disconnect()
        })

      break
    }
}
