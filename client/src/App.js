import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';

function App() {
  return (
    <div id="root">
      <main>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail id={1} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
