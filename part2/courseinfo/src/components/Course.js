import React from "react";

const Header = ({courseName}) => {
    return(
        <div>
            <h2>{courseName}</h2>
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
            {parts.map((part) => <Part key={part.id} part={part.name} exercise={part.exercises} />)}
        </div>
    )
}
  
const Total = ({parts}) => {
    
    const sum = parts.reduce(
        (prevValue, curValue) => prevValue + curValue.exercises, 0
    )
    return (
        <div>
            <p style={{fontWeight: 'bold'}}>
                total of {sum} exercises
            </p>
        </div>
    )
}
  
const Course = ({course}) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
        </div>
    )
}

export default Course;