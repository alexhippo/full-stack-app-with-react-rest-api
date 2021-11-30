import React, { useContext, useEffect } from 'react';
import Context from '../../Context';
import { useNavigate } from 'react-router-dom';

const UserSignOut = () => {
  const context = useContext(Context.Context);

  let navigate = useNavigate();

  useEffect(() => {
    context.actions.signOut();
    navigate('/');
  });

  return (
    <div></div>
  )
}

export default UserSignOut;