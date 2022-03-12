import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
  const context = useContext(noteContext)
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""});
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className="container my-3">
      <form>
        <div className="mb-3">
          <h1>Add Notes</h1>
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} min={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" >Description</label>
          <input type="text" value={note.description} className="form-control" id="description" name="description" onChange={onChange}  min={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label" >Tag</label>
          <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange} />
        </div>
        <button disabled={note.title.length < 5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote