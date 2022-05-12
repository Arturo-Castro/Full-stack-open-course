import React from 'react'

const Part = ({object}) => {
  return(
    <div>
      <h2>
        {object.name}
      </h2>
      {object.parts.map((object, i) => 
        <p key={i}>{object.name} {object.exercises}</p>
      )}
      <strong>total of {object.parts.reduce(function(accumulator, object){ return accumulator + object.exercises; }, 0)} exercises</strong>
    </div>
  
  )
}

const Content = ({course}) => {
  return(
    course.map((object) => <Part key={object.id} object={object}/>)
  )
}

const Header = (props) => {
  return(
    <h1>
      {props.text}
    </h1>
  )
  
}

const Course = (props) => {
  return(
    <div>
      <Header text="Web development curriculum"/>
      <Content course={props.course}/>
    </div>
  )
}

export default Course