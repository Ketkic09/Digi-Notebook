import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/noteContext";
import { AddNote } from "./AddNote";
import Noteitems from "./Noteitems";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, fetchNotes,editNote } = context;
  const [note,setNote] = useState({id:'',etitle:'',edescription:'',etags:''})
  let navigate = useNavigate()

  //Fetching all notes
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes(); 
    }
    else{
      console.log("useeffect else")
      navigate("/login")
      setNote([])
    }
},[])

  //Lanching Edit Modal of specfic note
  const ref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etags:currentNote.tags})

  };
  
  //Modal 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  //Modal form
  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const handleEdit = (e)=>{
    e.preventDefault()
    editNote(note.id,note.etitle,note.edescription,note.etags)
    console.log("Edited!")
    setShow(false)
    props.showAlert("Edited successfully!","success")  
  }

  return (
    <>
      
      <AddNote showAlert={props.showAlert} />
      <hr></hr>
      <h2 className="mt-4">Your Notes</h2>
     
      <div className="d-flex justify-content-center">
      {notes.length === 0 && <p className="text-muted">No notes added</p>}
      </div>
      <Button variant="primary" ref={ref} onClick={handleShow} className="d-none">
        launch edit 
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">
                Note Title
              </label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                placeholder="add your note title"
                name='etitle'
                minLength={2}
                value={note.etitle}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="edescription"
                rows="3"
                name='edescription'
                placeholder='add a description'
                minLength={5}
                value={note.edescription}
                onChange={onChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="etags" className="form-label">
                Note Tags
              </label>
              <input
                type="text"
                className="form-control"
                id="etags"
                placeholder="add your note title"
                name='etags'
                minLength={2}
                value={note.etags}
                onChange={onChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit} disabled={note.etitle.length<2 || note.edescription.length<5}>Save Edits</Button>
        </Modal.Footer>
      </Modal>
      
      <div className="row my-2">
       
        {notes.map((note) => {
          
          return (
          
            <Noteitems key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
