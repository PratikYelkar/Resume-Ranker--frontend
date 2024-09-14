// ForgotPasswordForm.js
import React, { useEffect, useState } from 'react';
import '../static/css/ForgotPasswordForm.css'; // Import the CSS file for styling
import { Link, useLocation } from 'react-router-dom';

const ForgotPasswordForm = ({ onClose }) => {

  const [formData, setFormData] = useState({
    email: '',
    userType: 'user',
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.userType) {
      setFormData((prevData) => ({
        ...prevData,
        userType: location.state.userType,
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling forgot password submission
    console.log(formData); // For demonstration purposes
  };

  return (
    <div className="forgot-password-form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label>
          Email:
          <input type="email" placeholder="Enter registered email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" />
        </label>

        <div className="user-type-radio-group m-4">
          <label className="m-2">
            <input
              type="radio"
              name="userType"
              value="user"
              checked={formData.userType === 'user'}
              onChange={handleInputChange}
            />
            User
          </label>
          <label className="m-2">
            <input
              type="radio"
              name="userType"
              value="recruiter"
              checked={formData.userType === 'recruiter'}
              onChange={handleInputChange}
            />
            Recruiter
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
        <Link to={'/'} className="btn btn-secondary text-decoration-none text-center">
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
