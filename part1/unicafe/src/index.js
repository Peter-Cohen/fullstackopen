import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const Statistic = ({ text, value }) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  const totalVotes = good + neutral + bad;
  if (totalVotes) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={totalVotes} />
          <Statistic text="average" value={(good - bad) / (totalVotes)} />
          <Statistic text="positive" value={good / (totalVotes) * 100.0 + ' %'} />
        </tbody>
      </table>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => { setGood(good + 1) }} text="good" />
      <Button onClick={() => { setNeutral(neutral + 1) }} text="neutral" />
      <Button onClick={() => { setBad(bad + 1) }} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
)