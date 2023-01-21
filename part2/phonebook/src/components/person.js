const Person = ({person, deleteEventHandler}) => {
  return (
    <div key={person.id}>
      {person.name} {person.number} <button onClick={() => deleteEventHandler(person.id)}>Delete</button>
    </div>
  )
}

export default Person