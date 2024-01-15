import React,{useState,useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const context=useContext(noteContext);
    const [cred, setCred] = useState({name:"",email:"",password:""});
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value});
    }
    const {signUp}=context;
    const handleClick=(e)=>{
        e.preventDefault();
        signUp(cred.name,cred.email,cred.password)
        navigate('/');
    }
    const handleSign=()=>{
        navigate('/login')
    }

    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">UserName</label>
                    <input type="text" className="form-control" id="1" name='name' onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="2" aria-describedby="emailHelp" name='email' onChange={handleChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="3" name='password' onChange={handleChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="btn btn-primary" onClick={handleSign}>Already A user??</button>
            </form>
        </div>
    )
}

export default SignUp