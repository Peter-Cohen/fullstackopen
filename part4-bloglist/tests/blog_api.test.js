const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const { listWithMultipleBlogs } = require('./api-test-data')
const { blogsInDb, usersInDb } = require('./api-test-helper')
const { userData } = require('./api-test-data')
const app = require('../app')

const api = supertest(app)


// Fill user and blogs collections before each test()
beforeEach(async () => {

  await User.deleteMany({})

  const userObjects = userData
    .map(user => {
      const passwordHash = bcrypt.hash(user.password, 10)

      const newUser = new User({
        username: user.username,
        name: user.name,
        passwordHash: passwordHash
      })

      return newUser
    })

  let promiseArray = userObjects.map(user => user.save())

  await Promise.all(promiseArray)





  await Blog.deleteMany({})

  const blogObjects = listWithMultipleBlogs
    .map(blog => {
      blog.user = usersInDb()[0]._id
      return new Blog(blog)
    }
    )

  promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})



// Tests for blogs
describe('Testing GET /api/blogs', () => {
  let response

  test('blogs are returned as json', async () => {
    response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs', async () => {
    expect(response.body).toHaveLength(listWithMultipleBlogs.length)
  })

  test('each blog has a unique identifier "id"', async () => {
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})



describe('Testing POST api/blogs', () => {

  test('correct response code and content type', async () => {
    const newBlog = {
      title: 'Some title',
      author: 'Joe Doe',
      url: 'http://www.joe.doe',
      likes: 99
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogPostsAfterPost = await blogsInDb()

    expect(blogPostsAfterPost)
      .toHaveLength(listWithMultipleBlogs.length + 1)

    expect(blogPostsAfterPost
      .map(blog => blog.title))
      .toContain('Some title')
  })

  test('if the "likes" property is missing, it should default to 0', async () => {
    const newBlog = {
      title: 'Some title',
      author: 'Joe Doe',
      url: 'http://www.joe.doe',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(response.body.likes).toBeDefined()

    expect(response.body.likes).toBe(0)
  })


  test('if the "title" or "url" property is missing, return a 400', async () => {
    const newBlog = {
      // title: 'Some title',
      author: 'Joe Doe',
      url: 'http://www.joe.doe',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogPostsAfterPost = await blogsInDb()
    expect(blogPostsAfterPost.length).toBe(listWithMultipleBlogs.length)
  })
})



describe('Testing PUT /api/blogs/:id', () => {
  test('succeeds with correct status code if id is valid', async () => {
    const blogsBeforeUpdate = await blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]
    blogToUpdate.title = 'UPDATED!'

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await blogsInDb()
    expect(blogsAfterUpdate).toHaveLength(blogsBeforeUpdate.length)

    const titles = blogsAfterUpdate.map((blog) => blog.title)
    expect(titles).toContain(blogToUpdate.title)
  })
})



describe('Testing DELETE /api/blogs/:id', () => {
  test('', async () => {
    const blogsBeforeDelete = await blogsInDb()

    const blogToDelete = blogsBeforeDelete[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterDelete = await blogsInDb()
    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)

    const ids = blogsAfterDelete.map(blog => blog.id)
    expect(ids).not.toContain(blogToDelete.id)
  })
})




afterAll(() => {
  mongoose.connection.close()
})



