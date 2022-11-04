import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/noteContext";
import { AddNote } from "./AddNote";
import Noteitems from "./Noteitems";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, fetchNotes,editNote } = context;
  const [note,setNote] = useState({id:'',etitle:'',edescription:'',etags:''})

  //Fetching all notes
  useEffect(() => {
    fetchNotes(); 
    // eslint-disable-next-line
  }, []);

  //Lanching Edit Modal of specfic note
  const ref = useRef(null);

  const updateNote = (currentNote) => {
    console.log("update called")
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
    console.log("Edited!",note)
    setShow(false)  
 
  }

  return (
    <>
      <AddNote /> 
      
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
                value={note.etitle}
                onChange={onChange}
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
                value={note.edescription}
                onChange={onChange}
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
          <Button variant="primary" onClick={handleEdit}>Save Edits</Button>
        </Modal.Footer>
      </Modal>
      
      <div className="row my-4">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitems key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
