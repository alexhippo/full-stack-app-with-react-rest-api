import React, { useState } from 'react';

const Courses = (props) => {
  let [courses] = useState('');

  const results = props.data;

  if (results.length) {
    courses = results.map((course) => {
      return <a class="course--module course--link" href="course-detail.html">
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
