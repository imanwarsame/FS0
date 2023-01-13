/**
 * The Header function takes in a single argument called props, and returns a div with an h1 element
 * that contains the value of the course property of the props object.
 * @param props - {course: "Half Stack application development"}
 * @returns The Header component is being returned.
 */
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

/**
 * Part is a function that takes in props and returns a div with a p tag that contains the props.part
 * and props.exercises
 * @param props
 * @returns a JSX element.
 */
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

/**
 * Component that takes an array of objects, and returns an array of JSX Part elements.
 * @param props
 * @returns An array of Part components.
 */
const Content = (props) => {
  console.log(props);
  let content = props.parts.map(value => <Part part={value.name} exercises={value.exercises}/>)
  return (
    content
  )
}

/**
 * Component that takes in an array of objects, and returns the sum of the exercises property of each object.
 * @param props
 * @returns The sum of the exercises in the course.
 */
const Total = (props) => {
  console.log(props);
  let sum = 0
  props.parts.forEach(value => {
    sum += value.exercises;
  })

  return (
    <div>
      <p>
        Number of exercises {sum}
      </p>
    </div>
  )
}


/**
 * The function App() returns a div that contains the Header, Content, and Total components. 
 * 
 * The Header component is passed the course name as a prop. 
 * 
 * The Content component is passed the parts array as a prop. 
 * 
 * The Total component is passed the parts array as a prop.
 * @returns The return value of the function is the JSX element that is rendered to the DOM.
 */
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App