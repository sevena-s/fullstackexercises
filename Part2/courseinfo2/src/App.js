import React from "react";

const App = () => {
  const course = [
    {
    id: 1,
    name: "Half Stack application development ",
    parts: [
    {
      name: "Fundamentals of React ",
      ex: 10,
      id: 1
    },
    {
     name: "Using props to pass ",
     ex: 7,
     id: 2
    },
    {
      name: "State of a component ",
      ex: 14,
      id: 3
    },
    {
      name: "Redux ",
      ex: 11,
      id: 4
    }
  ]
},
{
  id: 2,
  name: 'Node.js',
  parts: [
    {
      name: 'Routing ',
      ex: 3,
      id: 1
    },
    {
      name: 'Middlewares ',
      ex: 7,
      id: 2
    }
  ]
}
  ]
  //return <Course course={course}/>      

  return(
    <div>
      <ul>
        {course.map(part =>
          <div key={part.id}>
            {
              <Course course={part}/>
            }
          </div>)}
      </ul>
    </div>
  )

}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name}/>
      <Content courses={course.parts}/>
      <Total courses={course.parts}/>
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

const Content = ({courses}) => {
  return(
    <div>
        {courses.map((part,i) =>
          <p key={i}>
            {part.name} {part.ex}
          </p>)}
    </div>
  )
}

const Total = ({courses}) => {
  const parts2 = courses.map(part=>part.ex)
  const total = parts2.reduce((s,p) => s += p)

  return(
    <div>
      <p>Number of Exercises {total}</p>
    </div>
  )
}

export default App;
