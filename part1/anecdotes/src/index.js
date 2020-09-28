import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = (props) => {

  const pickIndex = () => {
    return Math.floor((Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
    const idx = copyVotes.indexOf(Math.max(...copyVotes))
    setMaxMostVotesIndex(idx)
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)) // https://stackoverflow.com/a/20222538/4540821
  const [maxVotesIndex, setMaxMostVotesIndex] = useState(0)

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}
      <p>
        <Button onClick={() => setSelected(pickIndex())} text="next anecdote" />
        <Button onClick={() => handleVote()} text="vote" />
      </p>
      <h1>Most Popular Anecdote</h1>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>has {votes[maxVotesIndex]} votes</p>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)