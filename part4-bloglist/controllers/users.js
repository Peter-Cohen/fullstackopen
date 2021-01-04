const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')



usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs')
  response.json(users)
})



usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  if (body.username.length < 3) {
    return response.status(400).json({ error: 'username should be at least three characters' })
  }


  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})


module.exports = usersRouter