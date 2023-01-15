import { useState } from 'react'

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

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <div>
    {text} {value}
  </div>
)

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
      <div>
        <StatisticLine text={"Good:"} value={good}/>
        <StatisticLine text={"Neutral:"} value={neutral}/>
        <StatisticLine text={"Bad:"} value={bad}/>
        <StatisticLine text={"All:"} value={total}/>
        <StatisticLine text={"Average:"} value={(good+(bad*-1))/total}/>
        <StatisticLine text={"Positive:"} value={(good/total*100) + "%"}/>
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
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