import React from 'react'

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

  export default Course