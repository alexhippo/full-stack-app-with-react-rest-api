import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="wrap">
      <h2>Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <button className="button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )
}

export default NotFound;