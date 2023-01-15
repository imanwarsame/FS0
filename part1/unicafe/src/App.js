import { useState } from 'react'

/**
 * The Header function takes in a single argument, props, and returns a div with an h1 tag containing
 * the text property of the props object
 * @param props - an object that contains all the properties passed to the component.
 * @returns A React component
 */
const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>
        {props.text}
      </h1>
    </div>
  )
}

/**
 * Button is a function that returns a button element.
 * @param props - This is the object that contains all the properties that were passed to the
 * component.
 */
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

/**
 * It takes in two props, text and value, and returns a table row with two cells, the first one
 * containing the text prop and the second one containing the value prop
 */
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

/**
 * If the total of the good, neutral, and bad values is 0, then return a div that says "No feedback
 * given". Otherwise, return a table with the good, neutral, bad, all, average, and positive values
 * @returns The return value of the function is the return value of the last statement in the function.
 */
const Statistics = ({good, neutral, bad}) => {
  console.log(good,neutral,bad);
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text={"Good:"} value={good}/>
          <StatisticLine text={"Neutral:"} value={neutral}/>
          <StatisticLine text={"Bad:"} value={bad}/>
          <StatisticLine text={"All:"} value={total}/>
          <StatisticLine text={"Average:"} value={(good+(bad*-1))/total}/>
          <StatisticLine text={"Positive:"} value={(good/total*100) + "%"}/>
        </tbody>
      </table>
    )
  }

}


/**
 * The App function returns a div that contains a Header component, three Button components, and a
 * Statistics component
 * @returns The return value of the function is the JSX element.
 */
const App = () => {
  //Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Header text="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App