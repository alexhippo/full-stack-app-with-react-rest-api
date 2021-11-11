import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Courses from './Components/Courses';

function App() {
  return (
    <div className="App">
      <Courses />
    </div>
  );
}

export default App;
