import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';

const Courses = () => {
  let [courses] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => setData(response.data))
      .catch((error) => {
        console.error('Error fetching and parsing data', error);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }, [navigate]);

  if (data.length) {
    courses = data.map((course) => {
      return <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    });
  }

  return (
    isLoading ?
      <Loading />
      : <div className="wrap main--grid">
        {courses}
        <Link to='/courses/create' className="course--module course--add--module">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
          </span>
        </Link>
      </div>
  );
}

export default Courses;
