const PersonForm = ({newName, newNumber, addPersonHandler, nameChangeHandler, numberChangeHandler}) => {
  return (
    <form onSubmit={addPersonHandler}>
      <div>
        name: <input value={newName} onChange={nameChangeHandler} placeholder={"Add name here..."}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChangeHandler} placeholder={"Add number here..."}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

export default PersonForm