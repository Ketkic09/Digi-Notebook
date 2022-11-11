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
            'auth-token': localStorage.getItem('token')
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
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tags}) 
          
        });
        const note = await response.json()
        setNotes(notes.concat(note))
        console.log(response)
    }

    //EDIT  note
    const editNote = async (id,title,description,tags)=>{
      //API call 
      const response = await fetch(`${host}api/notes/updatenote/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
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
          'auth-token':localStorage.getItem('token')
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