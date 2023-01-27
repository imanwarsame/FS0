const Filter = ({filterName, eventHandler}) => {
  return (
    <div>
      Filter: <input value={filterName} onChange={eventHandler}/>
    </div>
  )
}

export default Filter