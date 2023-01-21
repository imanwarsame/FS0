const Filter = ({filterName, eventHandler}) => {
  return (
    <div>
      Find countries: <input value={filterName} onChange={eventHandler}/>
    </div>
  )
}

export default Filter