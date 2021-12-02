import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Context from '../../Context';
import Loading from '../Loading';

const CourseDetail = () => {
  const context = useContext(Context.Context);
  let courseDetail = useState('');
  const [course, setCourseDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authUser = context.authenticatedUser;

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch a course from the database
    const controller = new AbortController();
    context.data.getCourse(id)
      .then(response => {
        if (response.id) {
          setCourseDetail(response)
        } else {
          // If there is no course ID, direct to Not Found
          navigate('/notfound');
        }
      })
      .catch((error) => {
        console.error('Error fetching and parsing course', error);
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      });
    // Clean up to prevent memory leak
    return () => controller?.abort();
  }, [id, navigate, context.data]);

  if (course.id) {
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
          <ReactMarkdown>{course.description}</ReactMarkdown>
        </div>
        <div>
          <h3 className="course--detail--title">Estimated Time</h3>
          <p>{course.estimatedTime}</p>

          <h3 className="course--detail--title">Materials Needed</h3>
          <ul className="course--detail--list">
            <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
          </ul>
        </div>
      </div>
    </div>
  }

  const handleDelete = (event) => {
    event.preventDefault();
    context.data.deleteCourse(id, authUser.emailAddress, authUser.password)
      .then((response) => {
        // If course deletion is successful, then there should be no response returned
        if (response.length) {
          navigate('/error');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  }

  return (
    isLoading ?
      <Loading />
      : course ? <div>
        <div className="actions--bar">
          <div className="wrap">
            {authUser && (authUser.id === course.User.id) ?
              <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
              : null
            }
            {authUser && (authUser.id === course.User.id) ?
              <button className="button" onClick={handleDelete}>Delete Course</button>
              : null
            }
            <Link to='/' className="button button-secondary">Return to List</Link>
          </div>
        </div>
        {courseDetail}
      </div>
        : null
  )
}

export default CourseDetail;
