import React,{useState,useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const context=useContext(noteContext);
    const [cred,setCred] = useState({email:"",password:""});
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value});
    }
    const {login}=context;
    const handleLogin=()=>{
        navigate('/signup')
    }
    const handleClick=async(e)=>{
        e.preventDefault();
        login(cred.email,cred.password)
        navigate('/');
    }
    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
                <button className="btn btn-primary mx-3"  onClick={handleLogin}>Create new profile</button>
            </form>
        </div>
    )
}

export default LogIn