import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleclick}>
      {props.text}
    </button>
  )
}

const Title = (props) => (
  <h1>{props.text}</h1>
)

const Anecdote = (props) => {
  return(
    <div>
      <div>
        {props.anecdotes[props.selected]}
      </div>
      <div>
        has {props.list[props.selected]} votes
      </div>
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
  const [voteList, setVoteList] = useState(Array(7).fill(0))

  const voteListCopy = [...voteList]

  return (
    <div>
      <Title text="Anecdote of the day"/>
      <Anecdote selected={selected} anecdotes={anecdotes} list={voteListCopy}/>
      <Button 
        handleclick={() => {
          voteListCopy[selected] += 1
          setVoteList(voteListCopy)
        }} 
        text="Vote"
      />
      <Button handleclick={() => {setSelected(Math.floor(Math.random() * 7))}} text={"Next anecdote"}/>
      <Title text="Anecdote with most votes"/>
      <Anecdote selected={voteListCopy.indexOf(Math.max(...voteListCopy))} anecdotes={anecdotes} list={voteListCopy}/>
    </div>
  )
}

export default App