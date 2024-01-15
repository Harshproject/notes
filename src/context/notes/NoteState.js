import {useState} from "react";
import noteContext from "./noteContext";



const NoteState = (props)=>{
      
      const first=[];
      const [notes, setNotes] = useState(first)
      const host="http://localhost:5000";
      //login
      const login=async(email,password)=>{
        const response=await fetch(`${host}/api/auth/login`,{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          // body:`{"email":"${email}","password":"${password}"}`
          body:JSON.stringify({email,password})
          
        })
        let tkn=await response.json();
         tkn=tkn.authtoken;
         if(tkn){
          localStorage.setItem('token',tkn);
         }
        
        console.log(localStorage.getItem('token'));
          const res2=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
              "auth-token":localStorage.getItem('token')
            }
          })
  
          const json=await res2.json();
          setNotes(json)
      
      }
      //signup
      const signUp=async(name,email,password)=>{
        const response=await fetch(`${host}/api/auth/createuser`,{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          // body:`{"name":"${name}","password":"${password}","email":"${email}"}`
          body:JSON.stringify({name,email,password})
          
        })
        let tkn=await response.json();
        tkn=tkn.authtoken;
        localStorage.setItem('token',tkn);
        
        const res2=await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
            "auth-token":localStorage.getItem('token')
          }
        })
        const json=await res2.json();
        setNotes(json)
      }
      //Addnote
      const addNote=async(title,description,tags)=>{
        const response=await fetch(`${host}/api/notes/addnote`,{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tags})
        })
        const res2=await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
            "auth-token":localStorage.getItem('token')
          }
        })
        const json=await res2.json();
        setNotes(json)
      }
      //deletenote
      const deleteNote=async(id)=>{
          console.log(id);
          const response=await fetch(`${host}/api/notes/delete/${id}`,{
            method:'DELETE',
            headers:{
              "Content-Type":"application/json",
              "auth-token":localStorage.getItem('token')
            }
          })
          
          const res2=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
              "auth-token":localStorage.getItem('token')
            }
          })
          const json=await res2.json();
          setNotes(json)
      }
      //editnote
      const editNote=(id,title,description,tags)=>{
        for(let idx=0;idx<notes.length();idx++){
          const note=notes[idx];
          if(note._id===id){
            note.title=title;
            note.description=description;
            note.tags=tags;
          }
        }
      }

    return (
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,signUp,login}}>
        {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;