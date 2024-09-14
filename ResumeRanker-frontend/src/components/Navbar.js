// NavigationBar.js

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../static/css/navbar.css';
import RecruiterNavbar from './Recruiter/RecruiterNavbar';
import UserNavbar from './user/UserNavbar';

const NavigationBar = () => {
  let [recruiterAuth, setrecruiterAuth] = useState(false);
  let [userAuth, setUserAuth] = useState(false);

  const [isLogout, setIsLogout] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLogout(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 50;
  
      setIsSticky(offset > threshold);
    };
  
    // Update state using setrecruiterAuth
    setrecruiterAuth(localStorage.getItem('recruiter'));
    setUserAuth(localStorage.getItem('user'));
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (isLogout) {
      if(recruiterAuth){
        localStorage.removeItem('recruiter');        
        setrecruiterAuth(false);
        navigate('/recruiter-login');
      }
      if(userAuth){
        localStorage.removeItem('user');
        setUserAuth(false);
        navigate('/user-login');
      }
    }
  }, [isLogout, recruiterAuth, userAuth, navigate]);

  return (
    <>
      {
      recruiterAuth ?
        <RecruiterNavbar onLogout={handleLogout} /> 
      : 
      userAuth ? 
        <UserNavbar onLogout={handleLogout} />
      :
        <Navbar bg="dark" variant="dark" expand="sm" className={isSticky ? 'sticky' : ''}>
          <Container>
            <Navbar.Brand as={Link} to="/">Resume Ranker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/#home">Home</Nav.Link>
                <Nav.Link href="/#about">About Us</Nav.Link>
                <Nav.Link href="/#services">Services</Nav.Link>
                <Nav.Link href="/#contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>      
        </Navbar>
      }
    </>
  );
};

export default NavigationBar;
