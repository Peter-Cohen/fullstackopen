import React from 'react'
import Person from './Person'


const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={() => handleDelete(person.id)}
        />)}
    </div>
  )
}


export default Persons 
