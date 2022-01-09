import React, { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
  
}

const Feedback = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={props.handleGood} text="good"/>
      <Button onClick={props.handleNeutral} text="neutral"/>
      <Button onClick={props.handleBad} text="bad" />
    </div>
  ) 
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  const count = good + bad + neutral;
  const sum = good - bad;
  const average = sum / count;
  const positive = (good / count) * 100;
  
  if (count === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} /> 
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={count} />
          <StatisticLine text="average" value={average.toLocaleString(undefined, {maximumFractionDigits:1})} />
          <StatisticLine text="positive" value={positive.toLocaleString(undefined, {maximumFractionDigits:1}).concat(" %")} />
        </tbody>
      </table> 
    </div>
  )
} 


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleBad = () => setBad(bad + 1)
  const handleNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <Feedback handleGood={handleGood} handleBad={handleBad} handleNeutral={handleNeutral} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
