import Country from "./Country";

const Countries = ({countries, showInfoHandler}) => {
  if (countries.length === 1) {
    const nation = countries[0]
    return (
      <div>
        <Country key={nation.id} country={nation} showInfoHandler={showInfoHandler} showExtendedInfo={true}/>
      </div>
    )
  } else if (countries.length < 10) {
    return (
      <div>
        <ul>
          {countries.map(value => <Country key={value.id} country={value} showInfoHandler={showInfoHandler}/>)}
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, please be more specific
      </div>
    )
  }

}

export default Countries