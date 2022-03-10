import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const initialNotes= [
  {
    "_id": "62243341d5392c17a59276216",
    "user": "62236ca5f3c150792ae34345",
    "title": "my title",
    "description": "msnfkendfw",
    "tag": "general",
    "date": "2022-03-06T04:10:05.480Z",
    "__v": 0
  },
  {
    "_id": "6224341d51392c17a59276218",
    "user": "62236ca5f3c150792ae34345",
    "title": "my title",
    "description": "msnfkendfw",
    "tag": "general",
    "date": "2022-03-06T04:10:05.709Z",
    "__v": 0
  },
  {
    "_id": "6224341d5392c17a59276221a",
    "user": "62236ca5f3c150792ae34345",
    "title": "my title",
    "description": "msnfkendfw",
    "tag": "general",
    "date": "2022-03-06T04:10:05.997Z",
    "__v": 0
  },
  {
    "_id": "6224341e53922c17a5927621c",
    "user": "62236ca5f3c150792ae34345",
    "title": "my title",
    "description": "msnfkendfw",
    "tag": "general",
    "date": "2022-03-06T04:10:06.169Z",
    "__v": 0
  },
  {
    "_id": "6224341e5392c127a5927621e",
    "user": "62236ca5f3c150792ae34345",
    "title": "my title",
    "description": "msnfkendfw",
    "tag": "general",
    "date": "2022-03-06T04:10:06.352Z",
    "__v": 0
  },
  {
    "_id": "6224341e5392c127a59276220",
    "user": "62236ca5f3c150792ae34345",
    "title": "my title",
    "description": "msnfkendfw",
    "tag": "general",
    "date": "2022-03-06T04:10:06.567Z",
    "__v": 0
  },
  {
    "_id": "62245873dbb937387e3314ad",
    "user": "62236ca5f3c150792ae34345",
    "title": "my title",
    "description": "msnfkendfw",
    "tag": "general",
    "date": "2022-03-06T06:45:07.094Z",
    "__v": 0
  }
]
const [notes,setNotes]=useState(initialNotes)
const addNote = (title,description,tag)=>{
 const note={
    "_id": "6224341d5392c17aq592762164",
    "user": "62236ca5f3c150792ae34345",
    "title":title,
    "description":description,
    "tag":tag,
    "date": "2022-03-06T04:10:05.480Z",
    "__v": 0
  };
  setNotes(notes.concat(note))
}
const editNote = ()=>{
  
}
const deleteNote = (id)=>{
  const newNotes = notes.filter((notes)=>{return notes._id!==id})
  setNotes(newNotes)
}
    return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote }}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState