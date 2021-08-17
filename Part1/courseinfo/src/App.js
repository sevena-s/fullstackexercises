import React from "react";

const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const ex1 = 10
  const part2 = "Using props to pass data"
  const ex2 = 7
  const part3 = "State of a component"
  const ex3 = 14
  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2= {part2} part3= {part3} ex1= {ex1} ex2= {ex2} ex3= {ex3}/>
      <Total total={ex1+ex2+ex3}/>
    </div>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.part1} ex={props.ex1}/>
      <Part part={props.part2} ex={props.ex2}/>
      <Part part={props.part3} ex={props.ex3}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of Exercises {props.total}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.ex}
      </p>
    </div>
  )
}

export default App;
