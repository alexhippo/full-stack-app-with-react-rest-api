import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateCourse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseUserFirstName, setCourseUserFirstName] = useState('');
  const [courseUserLastName, setCourseUserLastName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        setCourseTitle(response.data.title);
        setCourseDescription(response.data.description);
        setCourseUserFirstName(response.data.User.firstName);
        setCourseUserLastName(response.data.User.lastName);
        setEstimatedTime(response.data.estimatedTime);
        setMaterialsNeeded(response.data.materialsNeeded);
      })
      .catch(error => console.log('Error fetching and parsing course', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'courseTitle') {
      setCourseTitle(value);
    }

    if (name === 'courseDescription') {
      setCourseDescription(value);
    }

    if (name === 'estimatedTime') {
      setEstimatedTime(value);
    }

    if (name === 'materialsNeeded') {
      setMaterialsNeeded(value);
    }
  }

  const submit = () => {

  }

  const cancel = () => {
    navigate('/');
  }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" defaultValue={courseTitle} />

            <p>By {courseUserFirstName} {courseUserLastName}</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription" defaultValue={courseDescription}></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={estimatedTime} />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={materialsNeeded}></textarea>
          </div>
        </div>
        <button className="button" type="submit" onClick={submit}>Update Course</button>
        <button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div>
  )
}

export default UpdateCourse;