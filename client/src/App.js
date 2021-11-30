import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses/Courses';
import CourseDetail from './Components/Courses/CourseDetail';
import UpdateCourse from './Components/Courses/UpdateCourse';
import UserSignIn from './Components/User/UserSignIn';
import UserSignUp from './Components/User/UserSignUp';
import UserSignOut from './Components/User/UserSignOut';
import CreateCourse from './Components/Courses/CreateCourse';
import NotFound from './Components/Errors/NotFound';
import Forbidden from './Components/Errors/Forbidden';
import UnhandledError from './Components/Errors/UnhandledError';

import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div id="root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/courses" />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/update" element={<PrivateRoute />}>
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
          </Route>
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/courses/create" element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
          </Route>
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
