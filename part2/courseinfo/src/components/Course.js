import React from 'react'


const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}


const Total = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((total, exercises) => total + exercises)

  return (
    <p>Number of exercises {sum}</p>
  )
}


const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}


const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, k) => <Part key={k} part={part} />)}
    </div>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


export default Course