import React from 'react'
import addnote from './../images/addnote.jpeg'
import deletenote from './../images/deletenote.jpeg'
import editnote from './../images/editnote.jpeg'
import viewnote from './../images/viewnote.jpeg'
import demo from './../images/demo.jpeg'


const About = () => {
  
  return (
    <>
    <h1>Welcome to DigiNotebook!</h1>
    <hr></hr>
    <p>Note down all your ideas,thoughts,plans in one secure place.</p>
    <p>Signup and get started!</p>

    <ul>
      <li>
      <strong >Perform CRUD functions</strong>
      <img src={addnote} width="100% auto" height="auto" alt="add note"></img>
      <img src={demo} width="90% auto " height="auto" alt="add note"></img>
      </li>
    </ul>
    </>
    
  )
}

export default About
