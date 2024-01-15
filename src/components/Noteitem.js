import React,{useContext} from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{"width": "18rem"}}>
                    <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                        <FiEdit className="mx-2" style={{"cursor":"pointer"}} />
                        <MdDeleteOutline className="mx-2" style={{"cursor":"pointer"}} onClick={()=>{deleteNote(note._id)}}/>
                        </div>
                    </div>
                        <p className="card-text">{note.description}</p>
                        
                    </div>
            </div>
        </div>
    )
}

export default Noteitem