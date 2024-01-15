import './App.css';
import React from "react";
import NoteState from './context/notes/NoteState';
import Point from './components/Point';


function App() {
 
  return (
    <NoteState>
  <Point/>
      </NoteState>
  );
}

export default App;
