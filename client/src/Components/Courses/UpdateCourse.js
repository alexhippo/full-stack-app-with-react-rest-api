import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Context from '../../Context';
import Loading from '../Loading';

const UpdateCourse = () => {
  const context = useContext(Context.Context);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setCourseTitle] = useState('');
  const [courseUserFirstName, setCourseUserFirstName] = useState('');
  const [courseUserLastName, setCourseUserLastName] = useState('');
  const [description, setCourseDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    context.data.getCourse(id)
      .then((response) => {
        if (response.error === "Sorry, we couldn't find the course you were looking for.") {
          navigate('/notfound');
        } else {
          // If the currently authenticated user is the same as the Course author
          // Allow the user to update the Course
          if (authUser.id === response.User.id) {
            setCourseTitle(response.title);
            setCourseDescription(response.description);
            setCourseUserFirstName(response.User.firstName);
            setCourseUserLastName(response.User.lastName);
            setEstimatedTime(response.estimatedTime);
            setMaterialsNeeded(response.materialsNeeded);
          } else {
            navigate('/forbidden');
          }
        }
      })
      .catch(error => {
        console.error('Error fetching and parsing data', error);
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      });
    // Clean up to prevent memory leak
    return () => controller?.abort();
  }, [authUser.id, id, navigate, context.data]);

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'title') {
      setCourseTitle(value);
    }

    if (name === 'description') {
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
    // Course object to update the course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };

    context.data.updateCourse(id, course, authUser.emailAddress, authUser.password)
      .then((response) => {
        if (response.length) {
          setErrors(response);
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
    isLoading ?
      <Loading />
      : <div className="wrap">
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
              <input id="courseTitle" name="title" type="text" value={title} onChange={onChange} />

              <p>By {courseUserFirstName} {courseUserLastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="description" value={description} onChange={onChange}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={onChange} />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={onChange}></textarea>
            </div>
          </div>
          <button className="button" type="submit" onClick={submit}>Update Course</button>
          <button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
      </div>
  )
}

export default UpdateCourse;