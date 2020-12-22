require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('post-body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))


app.get('/info', (req, res, next) => {
  Person.find({})
    .then(result => {
      res.send(`<p>Phonebook has info on ${result.length} people</p><p>${new Date()}</p>`)
    })
    .catch(error => next(error)
    )
})


app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const personToAdd = new Person({
    name: body.name,
    number: body.number,
  })

  personToAdd
    .save()
    .then(newPerson => {
      res.json(newPerson.toJSON())
    })
    .catch(error => next(error))

})


app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const updatedPerson = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body

  // if (body.content === undefined) {
  //   return response.status(400).json({ error: 'content missing' })
  // }

  const person = new Person({
    content: body.content,
    number: body.number
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson)
    )
    .catch(e => next(e))

})


app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndRemove(id)
    .then(deletedPerson => {
      res.status(204).json(deletedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ errorMessage: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})