import Notes from './Notes'
import { useState,useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Home = () => {
  const context=useContext(noteContext);
  const {addNote}=context;
  const [note, setNote] = useState({title:"",description:"",tags:"default"});

  const handleClick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tags);
  }
  const handleChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  
  return (
    <div>
      <div className='conatiner my-3'>
        <h1>Add your Note</h1>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleInputEmail1"  name="title" onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">description</label>
            <input type="text" className="form-control" id="exampleInputPassword1" name="description" onChange={handleChange}/>
          </div>
         
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        <h1>Your Notes</h1>
        <Notes/>
      </div>
    </div>
  )
}

export default Home