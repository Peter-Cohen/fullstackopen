const Header = ({ course }) => <h1>{course}</h1>


const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)
  return <b>Number of exercises: {totalExercises}</b>
}


const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({ parts }) => {
  return (
    <div>{parts.map(part => <Part key={part.id} part={part} />)}</div>
  )
}


const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}


export default Course