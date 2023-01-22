import Country from "./Country";
import { v4 } from 'uuid'

const Countries = ({countries, showInfoHandler, showExtendedInfo}) => {
  if (countries.length === 1) {
    const nation = countries[0]

    return (
      <div>
        <Country key={v4()} country={nation} showInfoHandler={showInfoHandler} showExtendedInfo={true}/>
      </div>
    )
  } else if (countries.length < 10) {
    return (
      <div>
        <ul>
          {countries.map(value => <Country key={v4()} country={value} showInfoHandler={showInfoHandler} showExtendedInfo={showExtendedInfo}/>)}
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