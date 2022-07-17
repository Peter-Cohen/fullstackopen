import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleNewNameChange = event => setNewName(event.target.value)
  const handleNewNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)


  const notify = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000)
  }


  const addName = (event) => {
    event.preventDefault()

    if (!newName) return

    const personAlreadyPresent = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (personAlreadyPresent) {
      if (personAlreadyPresent.number === newNumber) {
        alert(`${newName} is already in the phonebook with the same number`)

        // What is more user-friendly, reset or not? :
        // setNewName('')
        // setNewNumber('')
        return
      }

      if (window.confirm(`Change number of ${newName} to ${newNumber}?`)) {
        personService.update(personAlreadyPresent.id, { ...personAlreadyPresent, number: newNumber })
          .then(response => {
            setPersons(
              persons.map((person) => (person.id !== response.id ? person : response)))
              notify(`Information on "${personAlreadyPresent.name}" updated`, 'info')
          })
          .catch(error => {
            notify(`Information on "${personAlreadyPresent.name}" was already removed from server`, 'error')
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const newNameObject = { name: newName, number: newNumber }
    personService.create(newNameObject)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        notify(`Added ${newName}`, 'info')
      })
      .catch(error => {
        notify(`Could not add information on "${newNameObject.name}" on the server`, 'error')
        console.log(error)
      })
  }


  const filteredPersons =
    filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons


  const deletePerson = person => {
    const personToDelete = (persons.filter(p => p.id === person.id))[0]   // use find??

    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      personService.remove(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          notify(`Deleted ${personToDelete.name} from the server`, 'info')
        })
        .catch(e => {
          notify(`"${personToDelete.name}" could not be deleted from the server`, 'error')
          console.log(e)
        })
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type={notification.type} message={notification.message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm
        addName={addName}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}


export default App
