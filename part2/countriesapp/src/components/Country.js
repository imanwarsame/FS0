import { v4 } from 'uuid'

const Country = ({country, showInfoHandler, showExtendedInfo = false}) => {
  if (showExtendedInfo) {
    //Get array of languages as it is currently an object
    const langArray = Object.keys(country.languages).map((key) => [country.languages[key]]);
    console.log(country.id);
    return (
      <div key={country.id}>
        <h2>{country.name.official}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} m2</p>
        <h3>Languages</h3>
        <ul>
          {langArray.map((item) => <li key={v4()}>{item}</li>)}
        </ul>
        <img src={country.flags.png} alt="Flag of selected country"></img>
      </div>
    )
  } else {
    return (
      <div key={country.id}>
        {country.name.official} <button onClick={() => showInfoHandler(country.id)}>Show</button>
      </div>
    )
  }
}

export default Country