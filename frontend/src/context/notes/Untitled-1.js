import React, { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
 const host = "http://localhost:4000"
 const notesInitial = [   {
             "_id": "6424bea4d28dc9d885e4e521",
             "user": "6443e75452f4d6c695c3bef5",
             "title": "MY titile",
             "description": "Pls go to gym ",
             "tag": "gym",
             "date": "2023-04-23T05:14:12.267Z",
             "__v": 0
           },
           {
             "_id": "6424bec4d28dc9d885e4e521",
             "user": "6443e75452f4d6c695c3bef5",
             "title": "MY titile",
             "description": "Pls go to gym ",
             "tag": "gym",
             "date": "2023-04-23T05:14:12.267Z",
             "__v": 0
           },]
 const [notes, setNotes] = useState(notesInitial)

 // Get all Notes
 const getNotes = async () => {
   // API Call 
   const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
     }
   });
   const json = await response.json()
   console.log(json)
   setNotes(json)
 }

 // Add a Note
 const addNote = async (title, description, tag) => {
   // TODO: API Call
   // API Call 
   const response = await fetch(`${host}/api/notes/addnote`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
     },
     body: JSON.stringify({title, description, tag})
   });
    

   console.log("Adding a new note")
   const note = {
     "_id": "61322f119553781a8ca8d0e08",
     "user": "6131dc5e3e4037cd4734a0664",
     "title": title,
     "description": description,
     "tag": tag,
     "date": "2021-09-03T14:20:09.668Z",
     "__v": 0
   };
   setNotes(notes.concat(note))
 }

 // Delete a Note
 const deleteNote = (id) => {
   // TODO: API Call
   console.log("Deleting the note with id" + id);
   const newNotes = notes.filter((note) => { return note._id !== id })
   setNotes(newNotes)
 }
 // Edit a Note
 const editNote = async (id, title, description, tag) => {
   // API Call 
   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
     },
     body: JSON.stringify({title, description, tag})
   });
   const json = response.json();

   // Logic to edit in client
   for (let index = 0; index < notes.length; index++) {
     const element = notes[index];
     if (element._id === id) {
       element.title = title;
       element.description = description;
       element.tag = tag;
     }

   }
 }

 return (
   <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
     {props.children}
   </NoteContext.Provider>
 )

}
// export default NoteState;