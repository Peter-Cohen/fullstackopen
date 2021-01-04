const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
// const { tokenExtractor } = require('../utils/middleware.js')



// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }


bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs)
})


bloglistRouter.post('/', async (request, response) => {
  const body = request.body

  // For now I just pick the first user
  // const aUser = await User.findOne({})
  // console.log('aUser', aUser)


  console.log('request.token', request.token)
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  console.log('decodedToken', decodedToken)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)



  const newBlog = new Blog({
    ...body,
    user: user._id
  })

  const postResponse = await newBlog.save()

  user.blogs = user.blogs.concat(postResponse._id)

  await user.save()


  response.status(201).json(postResponse)
})


bloglistRouter.put('/:id', async (request, response) => {

  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  console.log('decodedToken', decodedToken)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }




  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updatedBlog.toJSON())

})


bloglistRouter.delete('/:id', async (request, response) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  console.log('decodedToken', decodedToken)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(deletedBlog.toJSON())
})




module.exports = bloglistRouter