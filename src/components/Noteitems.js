import React, { useContext } from 'react'
import NoteContext from "../context/notes/noteContext";

const Noteitems = (props) => {
  const {note,updateNote} = props
  const context = useContext(NoteContext)
  const {deleteNote} = context


  return (
    <div className='col-md-3'>
        <div className="card my-3">
        <div className="card-body">
            <div className='d-flex align-items-center'>
            <h5 className="card-title">{note.title}</h5>
            <p className='mx-2 text-muted mb-2'>{note.date}</p>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{return updateNote(note)}} ></i>
            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>     
        </div>
        </div>    
    </div>
    
    
  )
}

export default Noteitems