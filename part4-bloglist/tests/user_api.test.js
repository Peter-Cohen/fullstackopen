const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const { listWithMultipleBlogs } = require('./api-test-data')
const { blogsInDb, usersInDb } = require('./api-test-helper')
const app = require('../app')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = listWithMultipleBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('Testing POST /api/users', () => {

  describe('when there is initially one user in db:', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)

      const user = new User({
        name: 'root',
        username: 'root',
        passwordHash
      })

      await user.save()
    })

    test('we can create a new user with a username not yet in the database', async () => {
      const usersBeforeAddition = await usersInDb()

      const newUser = {
        username: 'duif',
        name: 'lul',
        password: 'ga weg',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAfterAddition = await usersInDb()

      expect(usersAfterAddition.length).toBe(usersBeforeAddition.length + 1)

      const usernames = usersAfterAddition.map(user => user.username)
      expect(usernames).toContain(newUser.username)
    })



    test('we cannot create a new user with an already existing username', async () => {
      const usersBeforeAddition = await usersInDb()

      const newUser = {
        name: 'root',
        username: 'root',
        password: 'ga weg',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAfterAddition = await usersInDb()

      expect(usersAfterAddition.length).toBe(usersBeforeAddition.length)
    })
  })

  test('username should be at least three characters long', async () => {
    const usersBeforeAddition = await usersInDb()

    const newUser = {
      name: 'r',
      username: 'r',
      password: 'ga weg',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterAddition = await usersInDb()

    expect(usersAfterAddition.length).toBe(usersBeforeAddition.length)
    // check also the error message?? How??
  })

  test('password should be at least three characters long', async () => {
    const usersBeforeAddition = await usersInDb()

    const newUser = {
      name: 'r',
      username: 'r',
      password: 'r',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterAddition = await usersInDb()

    expect(usersAfterAddition.length).toBe(usersBeforeAddition.length)
    // check also the error message?? How??
  })
})
// })

afterAll(() => {
  mongoose.connection.close()
})


