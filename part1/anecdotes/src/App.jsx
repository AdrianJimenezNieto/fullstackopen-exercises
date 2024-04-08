import { useState } from 'react'

const Button = (props) => <button onClick={props.handler}>{props.text} </button>

const Header = (props) => <h1>{props.text}</h1>

const Anecdote = (props) => {
  if (props.points != undefined) {
    return (
      <div>
        <p>{props.anecdote}</p>
        <p>Has {props.points} votes.</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>{props.anecdote}</p>
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const mostVotedIndex = points.indexOf(Math.max(...points))

  const handleRandom = () => {
    const updateSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(updateSelected)
  }

  const handlePoints = () => {
    const updatePoints = [... points]
    updatePoints[selected] += 1
    setPoints(updatePoints)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>
        <Anecdote anecdote={anecdotes[selected]} points={points[selected]}/>
      </div>
      <div>
        <Button handler={handlePoints} text="Vote Anecdote" />
        <Button handler={handleRandom} text="Select Random" />
      </div>
      <Header text="Most voted anecdote" />
      <div>
        <Anecdote anecdote={anecdotes[mostVotedIndex]}/>
      </div>
    </div>
  )
}

export default App