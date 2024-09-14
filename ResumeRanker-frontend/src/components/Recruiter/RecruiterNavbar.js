// RecruiterNavbar.js
import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecruiterNavbar = ({ onLogout }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  
  const recruiterDetails =  JSON.parse(localStorage.getItem('recruiter'));  

  return (
    <Navbar bg="dark" variant="dark" expand="md" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/recruiter/dashboard">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleToggle} />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/recruiter/profile">
              {recruiterDetails.first_name} <i className="fas fa-chevron-down"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/recruiter/jobs">
              Create Jobs
            </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/recruiter/settings">
                Settings
              </NavDropdown.Item>
              {/* Add more dropdown items as needed */}
            </NavDropdown>
            <Button variant="light" className='btn-outline-danger' onClick={onLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RecruiterNavbar;
