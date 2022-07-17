import Person from './Person'


const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <table>
      <tbody>
        {filteredPersons.map((person) => (
          <tr key={person.name}>
            <Person person={person} deletePerson={deletePerson} />
          </tr>))}
      </tbody>
    </table>
  )
}


export default Persons