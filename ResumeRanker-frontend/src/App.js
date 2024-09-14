// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavigationBar from './components/Navbar'; // Import NavigationBar
import UserLoginForm from './components/UserLoginForm';
import RecruiterLoginForm from './components/RecruiterLoginForm';
import GoToTopButton from './components/GoToTopButton';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobDetails from './pages/JobDetails';
import { RecruiterProtectedRoutes, UserProtectedRoutes } from './components/ProtectedRoutes';
import RecruiterProfile from './components/Recruiter/RecruiterProfile';
import PageNotFound from './components/PageNotFound';
import CreateJobs from './components/Recruiter/CreateJobs';
import UserDashboard from './pages/UserDashboard';
import ApplyForJob from './components/user/ApplyForJob';
import UploadResume from './components/user/UploadResume';
import UserProfile from './components/user/UserProfile';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLoginForm />} />
        <Route path="/recruiter-login" element={<RecruiterLoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route element={<RecruiterProtectedRoutes />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/profile" element={<RecruiterProfile />} />
          <Route path="/recruiter/jobs" element={<CreateJobs />} />
          <Route path="/recruiter/job-details/:jobId" element={<JobDetails />} />

        </Route>
        <Route element={<UserProtectedRoutes />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/upload-resume" element={<UploadResume />} />          
        </Route>
        <Route path="/apply/:jobId" element={<ApplyForJob />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      <GoToTopButton />
    </Router>
  );
};

export default App;
