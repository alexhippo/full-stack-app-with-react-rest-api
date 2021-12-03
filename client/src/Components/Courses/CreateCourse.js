import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../Context';

const CreateCourse = () => {
  const context = useContext(Context.Context);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  let navigate = useNavigate();

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

  const submit = (event) => {
    event.preventDefault();
    // Course object to create a course
    const course = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };

    context.data.createCourse(course, authUser.emailAddress, authUser.password)
      .then(errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  }

  const cancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {errors.length ?
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
        : null
      }
      <form>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" value={courseTitle} onChange={onChange} />

            {/* Use current authenticated user's first name and last name as course author */}
            <p>By {authUser.firstName} {authUser.lastName}</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription" value={courseDescription} onChange={onChange}></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={onChange} />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={onChange}></textarea>
          </div>
        </div>
        <button className="button" type="submit" onClick={submit}>Create Course</button>
        <button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div >

  );
}

export default CreateCourse;
