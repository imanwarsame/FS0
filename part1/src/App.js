const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

//All content that needs to be rendered in the browser are
//usually defined as React components (see below aka JS functions)
const App = () => {
  const name = 'Kareem Abdul-Jabbar'
  const age = 75
  //The below is JSX, not html
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App