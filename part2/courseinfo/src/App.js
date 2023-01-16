const Header = ({ course }) => <h1>{course}</h1>

const Part = ({part, exercises}) => {
  return (
    <div>
      <p>
        {part} {exercises}
      </p>
    </div>
  )
}

const Content = ({parts}) => {
  let content = parts.map(value => <Part key={value.id} part={value.name} exercises={value.exercises}/>)
  return (
    content
  )
}

const Total = ({parts}) => {
  console.log(parts.exercises);
  let sum = parts.reduce((accum,item) => accum + item.exercises, 0)

  return (
    <div>
      <p>
        Number of exercises {sum}
      </p>
    </div>
  )
}


const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  let content = courses.map(value => <Course key={value.id} course={value}/>)
  return (
    content
  )
}

export default App