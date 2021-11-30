import React from 'react';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
      <button className="button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )
}

export default Forbidden;