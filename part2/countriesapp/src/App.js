import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Countries from "./components/Countries";
import CountriesService from "./services/countries";

const App = () => {
  //Set up react hooks
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

  //Use hook effect to GET data from server
  const hook = () => {
	  console.log('effect')

    CountriesService.getAll()
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
	}
	
	useEffect(hook, [])
  console.log('render', countries.length, 'countries')


  //Filter based on filter name. When filtername gets updated so will this variable
  const filteredCountries = countries.filter(value => value.name.official.toLowerCase().includes(filterName))

  //Event handler to delete person
  const showCountryInfo = (index) => {
    console.log('Show country info')
  }

  //Event handlers for input text changing
  const handleFilterChange = (event) => {
    setFilterName(event.target.value) //sets the filter state
  }


  return (
    <div>
      <Filter filterName={filterName} eventHandler={handleFilterChange}/>

      <Countries countries={filteredCountries} showInfoHandler={showCountryInfo}/>
    </div>
  )
}

export default App