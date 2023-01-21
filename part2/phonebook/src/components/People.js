import Person from "./Person";

const People = ({persons, deleteEventHandler}) => {
  return (
    <div>
      <ul>
        {persons.map(value => <Person key={value.id} person={value} deleteEventHandler={deleteEventHandler}/>)}
      </ul>
    </div>
  )
}

export default People