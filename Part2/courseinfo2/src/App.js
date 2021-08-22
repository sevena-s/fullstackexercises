import React from "react";

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
    {
      name: "Fundamentals of React",
      ex: 10,
      id: 1
    },
    {
     name: "Using props to pass ",
     ex: 7,
     id: 2
    },
    {
      name: "State of a component",
      ex: 14,
      id: 3
    }
  ]
}
  return <Course course={course}/>
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
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
  const [one,two,three] = props.parts
  return(
    <div>
      <Part part={one.name} ex={one.ex}/>
      <Part part={two.name} ex={two.ex}/>
      <Part part={three.name} ex={three.ex}/>
    </div>
  )
}

const Total = (props) => {
  const [one,two,three] = props.parts
  return(
    <div>
      <p>Number of Exercises {one.ex+two.ex+three.ex}</p>
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
