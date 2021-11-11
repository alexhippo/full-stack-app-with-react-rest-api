import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Courses from './Components/Courses';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => setData(response.data))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <Courses data={data} />
    </div>
  );
}

export default App;
