import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UpdateCourse from './Components/UpdateCourse';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import UnhandledError from './Components/UnhandledError';

import { withContext, Context } from './Context';
import PrivateRoute from './PrivateRoute';

const UserSignInWithContext = withContext(UserSignIn);

function App() {
  return (
    <div id="root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/update" element={<PrivateRoute />}>
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
          </Route>
          <Route path="/signin" element={<UserSignInWithContext />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/courses/create" element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
          </Route>
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
