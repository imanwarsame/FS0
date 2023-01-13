//Header component
const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

//Part component
const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

//Content component
const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part part={props.part} exercises={props.exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Number of exercises {props.sum}
      </p>
    </div>
  )
}


//Main app component (aka JS function)
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  let sum = 0
  parts.forEach(value => {
    sum += value.exercises;
  })

  let content = parts.map(value => <Content part={value.name} exercises={value.exercises}/>)

  return (
    <div>
      <Header course={course}/>
      {content}
      <Total sum={sum}/>
    </div>
  )
}

export default App