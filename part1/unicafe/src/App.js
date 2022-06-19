import { useState } from 'react'


const StatisticLine = ({ text, value }) => {
  return (
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const Statistics = ({ good, neutral, bad }) => {

  const totalVotes = good + neutral + bad
  const average = (good - bad) / totalVotes
  const positivePercentage = (good / totalVotes) * 100 + '%'

  return (
    <div>
      <h1>Statistics</h1>
      {totalVotes ? (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Total votes" value={totalVotes} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positivePercentage} />
          </tbody>
        </table>
      ) :
        <p>'no votes yet'</p>}
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        handleClick={() => setGood(good + 1)}
        text='Good'
      />

      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text='Neutral'
      />

      <Button
        handleClick={() => setBad(bad + 1)}
        text='Bad'
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App