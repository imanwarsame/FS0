import { useState } from 'react'
import Person from "./components/person";

const App = () => {
  //States for array of people in phonebook
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0118 999 881 999 119 725 3', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('Add name here...')
  const [newNumber, setNewNumber] = useState('Add number here...')
  const [filterName, setFilterName] = useState('')

  //Filter based on filter name. When filtername gets updated so will this variable
  const peopleToShow = persons.filter(value => value.name.toLowerCase().includes(filterName))

  //Event handler to add a new person
  const addPerson = (event) => {
    event.preventDefault() //Prevents page from reloading (the default form submittal action)

    //Check if person hasn't already been added
    if (persons.filter(value => value.name === newName).length > 0) {
      alert(`${newName} has already been added to the phonebook`)
      setNewName('') //Reset input box
    } else {
      //New person object to add
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject)) //Concat new person to persons array and update state
      setNewName('') //Reset input box
      setNewNumber('') //Reset input box
    }
  }

  //Event handlers for input text changing
  const handleNameChange = (event) => {
    setNewName(event.target.value) //sets the newName state
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value) //sets the newNumber state
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value) //sets the filter state
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter: <input value={filterName} onChange={handleFilterChange}/>
      </div>

      <h2>Add new entry</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map(value => <Person key={value.id} person={value}/>)}
      </ul>
    </div>
  )
}

export default App