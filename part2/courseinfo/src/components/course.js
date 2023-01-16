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
      <b>
        Number of exercises {sum}
      </b>
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

export default Course