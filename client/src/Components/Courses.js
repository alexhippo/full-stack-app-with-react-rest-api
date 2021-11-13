import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
  let [courses] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => setData(response.data))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => setIsLoading(false));
  }, []);

  if (data.length) {
    courses = data.map((course) => {
      return <a className="course--module course--link" href="course-detail.html">
        <h2>Course</h2>
        <h3>{course.title}</h3>
      </a>
    });
  }

  return (
    <div className="wrap main--grid">
      {courses}
    </div>
  );
}

export default Courses;
