import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import People from "./components/People";
import PersonForm from './components/PersonForm';

const App = () => {
  //States for array of people in phonebook
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Add name here...')
  const [newNumber, setNewNumber] = useState('Add number here...')
  const [filterName, setFilterName] = useState('')

  //Use hook effect to GET data from server
  const hook = () => {
	  console.log('effect')
	  axios
	    .get('http://localhost:3001/persons')
	    .then(response => {
	      console.log('promise fulfilled')
	      setPersons(response.data)
	    })
	}
	
	useEffect(hook, [])
  console.log('render', persons.length, 'persons')


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
      <Filter filterName={filterName} eventHandler={handleFilterChange}/>

      <h3>Add new entry</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPersonHandler={addPerson} nameChangeHandler={handleNameChange} numberChangeHandler={handleNumberChange}/>
      
      <h3>Numbers</h3>
      <People persons={peopleToShow}/>
    </div>
  )
}

export default App