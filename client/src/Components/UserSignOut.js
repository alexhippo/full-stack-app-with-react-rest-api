import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const signOut = () => {
  // @todo Add signout function here


  return (
    <Routes>
      <Route path="/signout" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default signOut;