import React from 'react';
const CourseList = props => {

  const results = props.data;
  let courses;
  console.log(results);
  if (results.length) {
    courses = results.map(course => <li>{course.title}</li>);
  }

  return (
    <ul className="course-list">
      {courses}
    </ul>
  );
}

export default CourseList;
