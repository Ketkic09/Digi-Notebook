import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props)=>{
  const host = 'http://localhost:5000/'
    const notesInitial = []
    
    const [notes,setNotes] = useState(notesInitial) 

    //fetch all notes
    const fetchNotes = async()=>{
      console.log("Fetching notes");
        //API call
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MzBiYTI5ZGQ1YzJiZjdhNTY1NmIwIn0sImlhdCI6MTY2NzM4MjMxOH0.VS8MhPFVCg_Q0RpprEWxKB7nPRd2QaXC50o0hduWbwE'
          },
          body: JSON.stringify() 
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)

    }

    //add a note
    const addNote= async(title,description,tags)=>{
        console.log("Adding note");
        //API call
        const response = await fetch(`${host}api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MzBiYTI5ZGQ1YzJiZjdhNTY1NmIwIn0sImlhdCI6MTY2NzM4MjMxOH0.VS8MhPFVCg_Q0RpprEWxKB7nPRd2QaXC50o0hduWbwE'
          },
          body: JSON.stringify({title,description,tags}) 
          
        });
        console.log(response)
        
        const note = {
            "_id": "635ad16517252370ee6217d700",
            "user": "63530ba29dd5c2bf7a5656b00",
            "title": title,
            "description": description,
            "tags": tags,
            "date": "2022-10-27T18:43:49.914Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    //EDIT  note
    const editNote = async (id,title,description,tags)=>{
      //API call 
      const response = await fetch(`${host}api/notes/updatenote/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MzBiYTI5ZGQ1YzJiZjdhNTY1NmIwIn0sImlhdCI6MTY2NzM4MjMxOH0.VS8MhPFVCg_Q0RpprEWxKB7nPRd2QaXC50o0hduWbwE'
        },
        body: JSON.stringify({title,description,tags}) 
      });
      const json = await response.json()
      console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))
      //edit for client side
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          console.log("entered if")
          element.title = title
          element.description = description
          element.tags = tags
          break
        }

      }
      setNotes(newNotes)
      console.log(notes)
    }

    //delete note
    const deleteNote= async(id)=>{
      console.log("deleting note with id"+id)
      //API call
      const response = await fetch(`${host}api/notes/deletenote/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MzBiYTI5ZGQ1YzJiZjdhNTY1NmIwIn0sImlhdCI6MTY2NzM4MjMxOH0.VS8MhPFVCg_Q0RpprEWxKB7nPRd2QaXC50o0hduWbwE'
        },
        
      });
      const json = await response.json()
      console.log(json)
      const deleteList = notes.filter((note)=>{return note._id !== id})
      setNotes(deleteList)
    }
      
    return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;