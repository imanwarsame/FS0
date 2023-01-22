import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Countries from "./components/Countries";
import CountriesService from "./services/countries";

const App = () => {
  //Set up react hooks
  const [countries, setCountries] = useState([])
  const [filteredCountries, setfilteredCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [showMoreInfo, setMoreInfo] = useState(false)

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


  //Filtered list. When filtername gets updated so will this variable
  // let filteredCountries = countries.filter(value => value.name.official.toLowerCase().includes(filterName))

  //Event handler to show single country information
  const showCountryInfo = (country) => {
    console.log('Show country info')
    setfilteredCountries (countries.filter(value => value === country))
    setMoreInfo(true)
  }

  //Event handlers for input text changing
  const handleFilterChange = (event) => {
    setFilterName(event.target.value) //sets the filter state
    setfilteredCountries(countries.filter(value => value.name.official.toLowerCase().includes(filterName)))
    setMoreInfo(false)
  }


  return (
    <div>
      <Filter filterName={filterName} eventHandler={handleFilterChange}/>

      <Countries countries={filteredCountries} showInfoHandler={showCountryInfo} showExtendedInfo={showMoreInfo}/>
    </div>
  )
}

export default App