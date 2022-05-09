import { useState } from 'react'

const Title = (props) => {
  return(
    <h1>
      {props.text}
    </h1>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleclick}>
      {props.text}
    </button> 
  )
}
const StatisticLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td>{props.text} {props.value}</td>
      </tr>
    </tbody>
  </table>
)

const Statistics = (props) => {
  if(props.goodValue + props.neutralValue + props.badValue === 0){
    return(
      <div>
        <h1>
          Statistics
        </h1>
        <div>
          No feedback given
        </div>
      </div>
    )
  }
  return(
    <div>
      <h1>
        Statistics
      </h1>
      <div>
        <StatisticLine text="Good" value ={props.goodValue} />
        <StatisticLine text="Neutral" value ={props.neutralValue} />
        <StatisticLine text="Bad" value ={props.badValue} />
        <StatisticLine text="All" value ={props.allValue} />
        <StatisticLine text="Average" value ={props.averageValue} />
        <StatisticLine text="Percentage" value ={props.percentageValue} />
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text={"Give feedback"}/>
      <Button handleclick={() => setGood(good + 1)} text={"Good"}/>
      <Button handleclick={() => setNeutral(neutral + 1)} text={"Neutral"}/>
      <Button handleclick={() => setBad(bad + 1)} text={"Bad"}/>
      <Statistics 
        goodValue={good}
        neutralValue={neutral}
        badValue={bad}
        allValue={good + neutral + bad}
        averageValue={(good - bad) / (good + neutral + bad)}
        percentageValue={good * 100 / (good + neutral + bad) + "%"}  
      /> 
    </div>
  )
}

export default App