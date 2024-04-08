import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => <button onClick={props.handler}>{props.text}</button>

const StatisticsLine = (props) => {
  if (props.porcentaje) {
    return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}%</td> 
    </tr>
    )
  }
  else{
    return (
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td> 
      </tr>
      )
  }
  }

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / total
  const positive = (props.good / total) * 100

  if (total != 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="total" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} porcentaje={true} />
        </tbody>
      </table>
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updateGood = good + 1
    setGood(updateGood)
  }

  const handleNeutral = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const handleBad = () => {
    const updateBad = bad + 1
    setBad(updateBad)
  }

  return (
    <div>
      <Header text={"Give Feedback"}/>
      <div>
        <Button text="Good" handler={handleGood}/>
        <Button text="Neutral" handler={handleNeutral}/>
        <Button text="Bad" handler={handleBad}/>
      </div>
      <Header text="Statistics"/>
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      />
    </div>
  )
}

export default App