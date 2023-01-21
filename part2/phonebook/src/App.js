import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import People from "./components/People";
import PersonForm from './components/PersonForm';
import NumbersService from "./services/numbers";

const App = () => {
  //States for array of people in phonebook
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Add name here...')
  const [newNumber, setNewNumber] = useState('Add number here...')
  const [filterName, setFilterName] = useState('')

  //Use hook effect to GET data from server
  const hook = () => {
	  console.log('effect')

    NumbersService.getAll()
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
      //Check if user wants to update the phone number
      if (window.confirm(`${newName} has already been added to the phonebook, would you like to replace the old number?`)) {
        const personToEdit = persons.find(value => value.name === newName)
        const changedPerson = { ...personToEdit, number: newNumber }

        NumbersService.update(personToEdit.id, changedPerson).then(response =>{
          //Update state to new array using map. If they do not have the id of the person to edit
          //then return themselves, otherwise replace the data
          setPersons(persons.map(n => n.id !== personToEdit.id ? n : response.data))

          setNewName('') //Reset input box
          setNewNumber('') //Reset input box
        })
      }
    } else {
      //New person object to add
      const personObject = {
        name: newName,
        number: newNumber
      }

      NumbersService.create(personObject)
      .then(response =>{
        //Concat new person that was just added to the db to persons array and update state
        setPersons(persons.concat(response.data))
        setNewName('') //Reset input box
        setNewNumber('') //Reset input box
      })

    }
  }

  //Event handler to delete person
  const delPerson = (index) => {
    console.log(persons.find(value => value.id === index))

    const personName = persons.find(value => value.id === index).name
    if (window.confirm('Are you sure you want to delete ' + personName + '?')) {
      NumbersService.deleteOne(index)
      .then(() => {
        //Update persons list
        setPersons(persons.filter(i => i.id !== index))
        console.log(personName + ' deleted')
      })
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
      <People persons={peopleToShow} deleteEventHandler={delPerson}/>
    </div>
  )
}

export default App