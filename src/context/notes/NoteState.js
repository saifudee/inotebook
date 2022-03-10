import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000/"
  const initialNotes =[]
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
  console.log(json)
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
  const json = response.json();
  // console.log(response)
 const note={
  "user": "62236ca5f3c150792ae34342",
  "title":title,
  "description":description,
  "tag":tag,
  "_id": "622973fcb2c6b427c379a133e",
  "date": "2022-03-10T03:43:56.373Z",
  "__v": 0
}
  setNotes(notes.concat(note))
}
const editNote = async(id,title,description,tag)=>{
  const response = await fetch(`${host}api/notes/updatenote/${id}`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyMzZjYTVmM2MxNTA3OTJhZTM0MzQ1In0sImlhdCI6MTY0NjQ5NTAyMX0.HVoNJWfOt5NnDZ398Ycnhn8NbvCJPJKKOqFldR5FyeY"
    },
    body: JSON.stringify({title,description,tag})
  })
  const json = response.json();
  // console.log(json)
  for (let index = 0; index <notes.length; index++) {
    const element = notes[index];
    if(element._id === id){
      element.title = title;
      element.description= description;
      element.tag = tag;
    }
  }
}
const deleteNote = async(id)=>{
  const response = await fetch(`${host}api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyMzZjYTVmM2MxNTA3OTJhZTM0MzQ1In0sImlhdCI6MTY0NjQ5NTAyMX0.HVoNJWfOt5NnDZ398Ycnhn8NbvCJPJKKOqFldR5FyeY"
    },
  });
  const json = response.json();
  console.log(json);
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