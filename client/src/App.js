import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Courses from './Components/Courses';

function App() {
  return (
    <BrowserRouter>
      <div id="root">
        <main>
          <Courses />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
