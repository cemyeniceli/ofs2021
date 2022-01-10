import React, { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({anectode, vote}) => {
  return (
    <div>
      <p>{anectode}</p>
      <p>has {vote} votes</p>  
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleNextAnecdote = () => {
    let newSelected = Math.floor(Math.random()*(anecdotes.length));
    if (newSelected === selected) {
      switch (newSelected) {
        case 0:
          newSelected = 1;
          break;
        case 6:
          newSelected = 5;
          break;
        default:
          newSelected = newSelected + 1;  
      }
    }
    setSelected(newSelected);
  }

  const handleVoting = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1
    setMostVoted(newVotes.indexOf(Math.max(...newVotes)));
    setVotes(newVotes);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anectode={anecdotes[selected]} vote={votes[selected]} />
      <Button text="vote" onClick={handleVoting}/>
      <Button text="next anecdote" onClick={handleNextAnecdote}/>
      <h1>Anectode with most notes</h1>
      <Anecdote anectode={anecdotes[mostVoted]} vote={votes[mostVoted]} />
    </div>
  )
}

export default App
