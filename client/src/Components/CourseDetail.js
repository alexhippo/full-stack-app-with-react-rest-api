import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = (props) => {
  let courseDetail = useState('');
  const [course, setCourseDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => setCourseDetail(response.data))
      .catch(error => console.log('Error fetching and parsing course', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (course) {
    courseDetail = <div className="wrap">
      <h2>Course Detail</h2>
      <div className="main--flex">
        <div>
          <h3 className="course--detail--title">Course</h3>
          <h4 className="course--name">{course.title}</h4>
          {course.User
            ? (<p>By {course.User.firstName} {course.User.lastName}</p>)
            : null
          }
          <p>{course.description}</p>
        </div>
        <div>
          <h3 className="course--detail--title">Estimated Time</h3>
          <p>{course.estimatedTime}</p>

          <h3 className="course--detail--title">Materials Needed</h3>
          <ul className="course--detail--list">
            {course.materialsNeeded ?
              course.materialsNeeded.split('*').map((material, index) => {
                if (material) {
                  return <li key={index}>{material}</li>
                } else {
                  return null;
                }
              })
              : ''}
          </ul>
        </div>
      </div>
    </div >
  } else {
    courseDetail = null;
  }


  return (
    isLoading ?
      <h2>Loading ...</h2>
      : <div>
        <div className="actions--bar">
          <div className="wrap">
            <a className="button" href="update-course.html">Update Course</a>
            <a className="button" href="#">Delete Course</a>
            <a className="button button-secondary" href="index.html">Return to List</a>
          </div>
        </div>
        {courseDetail}
      </div>
  )

}

export default CourseDetail;
