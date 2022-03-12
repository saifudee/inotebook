import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000/"
  const initialNotes =[];
const [notes,setNotes]=useState(initialNotes)
const getNote = async()=>{
  const response = await fetch(`${host}api/notes/getalluser`,{
    method:'GET',
    headers:{
      'Content-Type':"application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyMzZjYTVmM2MxNTA3OTJhZTM0MzQ1In0sImlhdCI6MTY0NjQ5NTAyMX0.HVoNJWfOt5NnDZ398Ycnhn8NbvCJPJKKOqFldR5FyeY"
    },
  })
  const json = await response.json();
  setNotes(json)
}
const addNote = async(title,description,tag)=>{
  const response = await fetch(`${host}api/notes/addnote`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyMzZjYTVmM2MxNTA3OTJhZTM0MzQ1In0sImlhdCI6MTY0NjQ5NTAyMX0.HVoNJWfOt5NnDZ398Ycnhn8NbvCJPJKKOqFldR5FyeY"
    },
    body:JSON.stringify({title,description,tag})
  })
  const note = await response.json();
  setNotes(notes.concat(note))
}
const editNote = async(id,title,description,tag)=>{
  const response = await fetch(`${host}api/notes/updatenote/${id}`,{
    method: 'PUT',
    headers:{
      'Content-Type':'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyMzZjYTVmM2MxNTA3OTJhZTM0MzQ1In0sImlhdCI6MTY0NjQ5NTAyMX0.HVoNJWfOt5NnDZ398Ycnhn8NbvCJPJKKOqFldR5FyeY"
    },
    body: JSON.stringify({title,description,tag})
  })
  const json =await response.json();
  let newNotes = JSON.parse(JSON.stringify(notes))
  for (let index = 0; index <notes.length; index++) {
    const element = newNotes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description= description;
      newNotes[index].tag = tag;
    }
    break;
  }
  setNotes(newNotes);
}
const deleteNote = async(id)=>{
  const response = await fetch(`${host}api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyMzZjYTVmM2MxNTA3OTJhZTM0MzQ1In0sImlhdCI6MTY0NjQ5NTAyMX0.HVoNJWfOt5NnDZ398Ycnhn8NbvCJPJKKOqFldR5FyeY"
    },
  });
  const json = await response.json();
  const newNotes = notes.filter((notes)=>{return notes._id!==id})
  setNotes(newNotes)
}
    return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNote}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState