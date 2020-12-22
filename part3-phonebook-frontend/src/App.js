import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })


  useEffect(() => {
    personService.getAll()
      .then(response => setPersons(response))
  }, [])


  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000)
  }


  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value)
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.deleteOne(id)
        .then(response => {
          setPersons(persons.filter((person) => person.id !== id));


          showNotification(`"${personToDelete.name}" deleted`, 'info')

          // setNotification({ message: `"${personToDelete.name}" deleted`, type: 'info' })
          // setTimeout(() => {
          //   setNotification({
          //     message: null,
          //     type: null
          //   })
          // }, 5000)

        })
        .catch(error => {
          console.log(error)


          showNotification(`Information on "${personToDelete.name}" was already removed from server`, 'error')
          // setNotification({ message: `Information on "${personToDelete.name}" was already removed from server`, type: 'error' })
          // setTimeout(() => {
          //   setNotification({
          //     message: null,
          //     type: null
          //   })
          // }, 5000)

        })
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    // If name already exists:
    if (persons.some(person => person.name.toLowerCase().trim() === newName.toLowerCase().trim())) {

      if (window.confirm(`${newName} already exists`)) {
        const id = persons.find((p => p.name === newName)).id
        const alteredPerson = {
          ...persons.find(person => person.id === id),
          number: newNumber
        }
        // Alter existing:
        personService.update(id, alteredPerson)
          .then(response => {
            const newPersons = persons.map(person => person.id !== id ? person : alteredPerson)
            setPersons(newPersons)

            showNotification(`Information on "${alteredPerson.name}" updated`, 'info')

            // setNotification({ message: `Information on "${alteredPerson.name}" updated`, type: 'info' })
            // setTimeout(() => {
            //   setNotification({
            //     message: null,
            //     type: null
            //   })
            // }, 5000)

          })
          .catch(error => {

            showNotification(`Error altering the number of "${alteredPerson.name}"`, 'error') ////!!!!!! alter



            // setNotification({ message: `Information on "${alteredPerson.name}" was already removed from the server`, type: 'error' })
            // setTimeout(() => {
            //   setNotification({
            //     message: null,
            //     type: null
            //   })
            // }, 5000)

            // Remove the person that was not found on the server from the persons array:
            setPersons(persons.filter(person => person.id !== id))
          })
        setNewName('')
        setNewNumber('')
      }
    }
    // Name does not yet exist, add new:
    else {
      personService.create(newName, newNumber)
        .then(response => {
          const personsObject = response
          setPersons(persons.concat(personsObject))

          showNotification(`Added ${newName}`, 'info')
          // setNotification({ message: `Added ${newName}`, type: 'info' })
          // setTimeout(() => {
          //   setNotification({
          //     message: null,
          //     type: null
          //   })
          // }, 5000)

          setNewName('')
          setNewNumber('')

        })
        .catch(error => {
          console.log('Error in add new', error.response.data)

          // ADD NOTIFICATION
          showNotification(error.response.data.error, 'error')
        })
    }
  }


  const filteredPersons = persons.filter(e => e.name.toLowerCase().includes(filterBy.toLowerCase().trim()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter
        filterBy={filterBy}
        onChange={handleFilterByChange}
      />
      <h2>Add new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  )
}


export default App