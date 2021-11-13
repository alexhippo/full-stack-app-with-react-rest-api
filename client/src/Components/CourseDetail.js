import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseDetail = (props) => {
  let [courseDetail] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${props.id}`)
      .then(response => setData(response.data))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  {
    if (data) {
      return < div className="main--flex" >
        <div>
          <h3 className="course--detail--title">Course</h3>
          <h4 className="course--name">{data.title}</h4>
          {data.User
            ? (<p>By {data.User.firstName} {data.User.lastName}</p>)
            : null
          }
          <p>{data.description}</p>
        </div>
        <div>
          <h3 className="course--detail--title">Estimated Time</h3>
          <p>{data.estimatedTime}</p>

          <h3 className="course--detail--title">Materials Needed</h3>
          <ul className="course--detail--list">
            {data.materialsNeeded ?
              data.materialsNeeded.split('*').map((material) => <li>{material}</li>)
              : ''}
          </ul>
        </div>
      </div>
    }
  }

  return (
    <div className="wrap">
      <h2>Course Detail</h2>
      {courseDetail}
    </div>
  );
}

export default CourseDetail;
