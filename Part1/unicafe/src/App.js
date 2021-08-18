import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';

const Button = ({handleClick, text}) => (
  <button onClick= {handleClick}>
    {text}
  </button>
)

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
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {allScores}</p>
      <p>Average {avg/allScores}</p>
      <p>Positive Percent {(good/allScores)*100} %</p>
    </div>
  )
}

export default App;
