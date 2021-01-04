const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) { return {} }

  const mostLiked = blogs.reduce((mostLikes, current) => current.likes > mostLikes.likes ? current : mostLikes)

  return ({
    'title': mostLiked.title,
    'author': mostLiked.author,
    'likes': mostLiked.likes
  })
}


const mostBlogs = (blogs) => {
  if (!blogs.length) { return {} }

  const authors = new Map()
  let authorWithMostBlogs = blogs[0].author

  blogs.forEach(blog => {
    const author = blog.author

    if (!authors.has(author)) {
      authors.set(author, 0)
    }

    authors.set(author, authors.get(author) + 1)

    if (authors.get(author) > authors.get(authorWithMostBlogs)) {
      authorWithMostBlogs = author
    }
  })


  return {
    author: authorWithMostBlogs,
    blogs: authors.get(authorWithMostBlogs)
  }
}


/* returns the author, whose blog posts have the largest amount of likes */
const mostLikes = blogs => {

  if (!blogs.length) { return {} }

  const authors = new Map()
  let authorWithMostLikes = blogs[0].author

  blogs.forEach(blog => {
    const author = blog.author

    if (!authors.has(author)) {
      authors.set(author, 0)
    }

    authors.set(author, authors.get(author) + blog.likes)

    if (authors.get(author) > authors.get(authorWithMostLikes)) {
      authorWithMostLikes = author
    }
  })

  return {
    author: authorWithMostLikes,
    likes: authors.get(authorWithMostLikes)
  }

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}