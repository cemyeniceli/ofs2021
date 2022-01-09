import react from 'react';

const Header = ({course}) => {
  return(
    <div>
      <h1>{course}</h1>
  </div>
  )
}

const Part = ({part, exercise}) => {
  return (
    <div>
      <p>
        {part} {exercise}
      </p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, i) => <Part key={i} part={part.name} exercise={part.exercises} />)}
    </div>
  )
}

const Total = ({parts}) => {
  
  const sum = parts.reduce(
    (prevValue, curValue) => prevValue + curValue.exercises, 0
  )
  return (
    <div>
      <p>
        Number of exercises {sum}
      </p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
