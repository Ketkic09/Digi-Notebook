import React, { useContext, useState } from 'react'
import NoteContext from "../context/notes/noteContext";

export const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context
    const [note,setNote] = useState({title:'',description:'',tags:''})

    const handleAdd = (e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tags);
        setNote({title:'',description:'',tags:''})
        props.showAlert("Note added successfully!","success")
    }
    const onChange = (e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-4">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Note Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="add your note title"
              name='title'
              value={note.title}
              minLength={2}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              name='description'
              placeholder='add a description'
              value={note.description}
              minLength={5}
              onChange={onChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Note Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              placeholder="add tags"
              value={note.tags}
              name='tags'
              minLength={2}
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length<2 || note.description.length<5} type='submit' className='btn btn-dark' onClick={handleAdd}>Add note</button>
        </form>
      </div>
  )
}
