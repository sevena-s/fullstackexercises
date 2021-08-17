import React from "react";

const App = () => {
  const course = "Half Stack application development"
  const part1 = {
    name: "Fundamentals of React",
    ex: 10
  }
  const part2 = {
    name: "Using props to pass ",
    ex: 7
  }
  const part3 = {
    name: "State of a component",
    ex: 14
  }
  return (
    <div>
      <Header course={course}/>
      <Content part1={part1.name} part2= {part2.name} part3= {part3.name} ex1= {part1.ex} ex2= {part2.ex} ex3= {part3.ex}/>
      <Total total={part1.ex+part2.ex+part3.ex}/>
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
