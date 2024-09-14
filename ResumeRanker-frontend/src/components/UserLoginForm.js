// UserLoginForm.js
import React, { useState } from 'react';
import '../static/css/UserLoginForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLoginForm = ({ onClose }) => {

  document.title = "Resume Ranker | User Login";

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
  });

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleForgotPassword = () => {
    // Navigate to ForgotPasswordForm with userType set to 'user'
    navigate('/forgot-password', { state: { userType: 'user' } });
  };
  const [loading, setLoading] = useState(false); // Added loading state
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true on form submission

      const baseURL = process.env.REACT_APP_baseURL || 'http://localhost:8000'; // Change this to your actual baseURL;
      const params = new URLSearchParams(formData);

      if(!isLogin){
        const response = await axios.post(`${baseURL}/user/register/`, params);
    
        if(response.data.message === 'User registered successfully'){
          alert("Registration Successful");
          // alert('Please verify your email from your inbox');
          setFormData({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            mobileNumber: '',
          });
          
          toggleForm();
        }else{
          alert('Something Went Wrong');
        }
      }else{
        const response = await axios.post(`${baseURL}/user/login/`, params);
    
        if(response.data.message === 'Login successful'){
          alert("Login Successful");
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          toggleForm();
          navigate('/user/dashboard')
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      // Handle error
      alert(`Error: ${error.response ? error.response.data.error : error.message}`);
    }
    setLoading(false)
  };

  return (
    <>
      <div className={`user-form-container ${isLogin ? 'login' : 'register'}`}>
        <h2>{isLogin ? 'User Login' : 'User Registration'}</h2>
        <form onSubmit={handleSubmit} className="user-form">
          {isLogin ? (
            <>
              <label>
                Email:
                <input type="email" placeholder="Enter registered email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" />
              </label>
              <label>
                Password:
                <input type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleInputChange} required className="form-input" />
              </label>
              <p className="forgot-password-link">
                <span onClick={handleForgotPassword}>Forgot Password</span>
              </p>
            </>
          ) : (
            <>
              <label>
                First Name:
                <input type="text" placeholder='Enter First Name' name="firstName" value={formData.firstName} onChange={handleInputChange} required className="form-input" />
              </label>
              <label>
                Last Name:
                <input type="text" placeholder='Enter Last Name' name="lastName" value={formData.lastName} onChange={handleInputChange} required className="form-input" />
              </label>
              <label>
                Email:
                <input type="email" placeholder='Enter email' name="email" value={formData.email} onChange={handleInputChange} required className="form-input" />
              </label>
              <label>
                Password:
                <input type="password" placeholder='Enter password' name="password" value={formData.password} onChange={handleInputChange} required className="form-input" />
              </label>
              <label>
                Mobile Number:
                <input type="tel" placeholder='Enter Mobile Number' name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required className="form-input" />
              </label>
            </>
          )}
          <button type="submit" className={`form-button ${isLogin ? 'login-button' : 'register-button'}`}>
            {isLogin ? 'Login' : 'Register'}
          </button>
          {loading && <div className="loader">Loading...</div>}
        </form>
        <p className="form-toggle">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" onClick={toggleForm} className="toggle-button">
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>      
      </div>
    </>
  );
};

export default UserLoginForm;
