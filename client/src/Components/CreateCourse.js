import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../Context';

const CreateCourse = () => {
  const context = useContext(Context.Context);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);

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

  const submit = () => {
    // Create course
    const course = {
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded,
    };

    context.data.createCourse(course)
      .then(errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate('/');
        }
      });
  }

  const cancel = () => {
    navigate('/');
  }

  return (
    <div class="wrap">
      <h2>Create Course</h2>
      <div class="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>Please provide a value for "Title"</li>
          <li>Please provide a value for "Description"</li>
        </ul>
      </div>
      <form>
        <div class="main--flex">
          <div>
            <label for="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" value={courseTitle} onChange={onChange} />

            {/* Set user */}
            <p>By Joe Smith</p>

            <label for="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription" value={courseDescription} onChange={onChange}></textarea>
          </div>
          <div>
            <label for="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={onChange} />

            <label for="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={onChange}></textarea>
          </div>
        </div>
        <button class="button" type="submit" onClick={submit}>Create Course</button>
        <button class="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div>

  );
}

export default CreateCourse;
