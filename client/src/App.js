import React from 'react';
import './App.css';

import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';

function App() {
  return (
    <div className="App">
      <Courses />
      <CourseDetail id={1} />
    </div>
  );
}

export default App;
