import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CourseList from './Components/CourseList';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('cats');
  const [isLoading, setIsLoading] = useState(true);

  // update the query state
  const performSearch = (value) => setQuery(value);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => setData(response.data))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <div className="App">
      <CourseList data={data} />
    </div>
  );
}

export default App;
