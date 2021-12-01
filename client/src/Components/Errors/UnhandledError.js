import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnhandledError = () => {
  const navigate = useNavigate();

  return (
    <div className="wrap">
      <h2>Error</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
      <button className="button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )
}

export default UnhandledError;