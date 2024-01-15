import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './SignUp';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import LogIn from './LogIn';


const Point = () => {

  return (
    <Router>
    <Navbar/>
    <div className='container'>
          <Routes>
         <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<LogIn />} />
          </Routes>
          </div>
      </Router>
  )
}

export default Point