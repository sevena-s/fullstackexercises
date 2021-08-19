import './App.css';
import React,{useState} from 'react';

const Button = ({handleClick, text}) => (
  <button onClick= {handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return(
   <div>
  <table>
    <thead>
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
    </thead>
  </table>
  </div> 
  )
}

const Statistics = (props) => {
  return(
    <div>
      <StatisticLine text={"Good"} value= {props.good}/>
      <StatisticLine text={"Neutral"} value= {props.neutral}/>
      <StatisticLine text={"Bad"} value= {props.bad}/>
      <StatisticLine text={"All"} value= {props.allScores}/>
      <StatisticLine text={"Average"} value= {props.avg/props.allScores}/>
      <StatisticLine text={"Positive Percent"} value={(props.good/props.allScores)*100}/>
    </div>
  )
}

const History = (props) => {
  if(props.allScores === 0){
    return(
      <div>
        No FeedBack Given
      </div>
    )
  }
  return(
    <div>
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad} allScores={props.allScores} avg={props.avg}/>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allScores, setScores] = useState(0)
  const [avg, setAvg] = useState(0)

  const handleGood = () => {
    setGood(good+1)
    setScores(allScores+1)
    setAvg(avg+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
    setScores(allScores+1)
  }
  const handleBad = () => {
    setBad(bad+1)
    setScores(allScores+1)
    setAvg(avg-1)
  }

  return(
    <div>
      <h1>Give FeedBack</h1>
      <Button handleClick={handleGood} text= {'Good'}/>
      <Button handleClick={handleNeutral} text= {'Neutral'}/>
      <Button handleClick={handleBad} text= {'Bad'}/>
      <h1>Statistics</h1>
      <History good= {good} neutral= {neutral} bad= {bad} allScores= {allScores} avg= {avg}/> 
    </div>
  )
}

export default App;
