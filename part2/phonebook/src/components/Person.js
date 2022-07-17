const Person = ({person, deletePerson}) => {
  return (
    <>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={() => deletePerson(person)}>Delete</button></td>
    </>
  )
}


export default Person