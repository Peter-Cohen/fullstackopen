const PersonForm =({addName, newName, newNumber, handleNewNameChange, handleNewNumberChange}) => {
  return (
    <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNewNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNewNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


export default PersonForm