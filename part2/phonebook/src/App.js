import { useState } from 'react'
import Person from "./components/person";

const App = () => {
  //States for array of people in phonebook
  const [persons, setPersons] = useState([
    { 
      id: 1,
      name: 'Arto Hellas' 
    }
  ]) 
  const [newName, setNewName] = useState('Add person here...')

  //Event handler to add a new person
  const addPerson = (event) => {
    event.preventDefault() //Prevents page from reloading (the default form submittal action)

    //Check if person hasn't already been added
    if (persons.filter(value => value.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('') //Reset input box
    } else {
      //New person object to add
      const personObject = {
        name: newName,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObject)) //Concat new person to persons array and update state
      setNewName('') //Reset input box
    }



  }

  //Event handler for input text changing
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(value => <Person key={value.id} person={value}/>)}
      </ul>
    </div>
  )
}

export default App