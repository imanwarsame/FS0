const Country = ({country, showInfoHandler, showExtendedInfo = false}) => {
  if (showExtendedInfo) {
    const langArray = Object.keys(country.languages).map((key) => [country.languages[key]]);
    console.log(country.id);
    return (
      <div key={country.id}>
        <h2>{country.name.official}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} m2</p>
        <h3>Languages</h3>
        <ul>
          {langArray.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <img src={country.flags.png}></img>
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