import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseDetail = (props) => {
  let courseDetail = useState('');
  const [course, setCourseDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${props.id}`)
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
              course.materialsNeeded.split('*').map((material) => <li>{material}</li>)
              : ''}
          </ul>
        </div>
      </div>
    </div>
  } else {
    courseDetail = null;
  }


  return (
    <div>
      <div class="actions--bar">
        <div class="wrap">
          <a class="button" href="update-course.html">Update Course</a>
          <a class="button" href="#">Delete Course</a>
          <a class="button button-secondary" href="index.html">Return to List</a>
        </div>
      </div>
      {courseDetail}
    </div>
  )

}

export default CourseDetail;
