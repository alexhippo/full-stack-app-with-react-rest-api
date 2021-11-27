import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Context from '../Context';

const UpdateCourse = () => {
  const context = useContext(Context.Context);
  const [isLoading, setIsLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseUserFirstName, setCourseUserFirstName] = useState('');
  const [courseUserLastName, setCourseUserLastName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

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

  const submit = (event) => {
    event.preventDefault();
    const course = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };

    context.data.updateCourse(id, course, authUser.emailAddress, authUser.password)
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

  const cancel = () => {
    navigate('/');
  }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
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
            <input id="courseTitle" name="courseTitle" type="text" defaultValue={courseTitle} onChange={onChange} />

            <p>By {courseUserFirstName} {courseUserLastName}</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription" defaultValue={courseDescription} onChange={onChange}></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={estimatedTime} onChange={onChange} />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={materialsNeeded} onChange={onChange}></textarea>
          </div>
        </div>
        <button className="button" type="submit" onClick={submit}>Update Course</button>
        <button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div>
  )
}

export default UpdateCourse;