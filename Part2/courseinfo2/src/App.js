import React from "react";
import Course from "./Course";

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

export default App;
