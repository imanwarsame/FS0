import Person from "./Person";

const People = ({persons}) => {
  return (
    <div>
      <ul>
        {persons.map(value => <Person key={value.id} person={value}/>)}
      </ul>
    </div>
  )
}

export default People