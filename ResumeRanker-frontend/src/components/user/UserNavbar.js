// UserNavbar.js
import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserNavbar = ({ onLogout }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  
  const userDetails =  JSON.parse(localStorage.getItem('user'));

  return (
    <Navbar bg="dark" variant="dark" expand="md" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/user/dashboard">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleToggle} />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/user/profile">
              {userDetails.first_name} <i className="fas fa-chevron-down"></i>
            </Nav.Link>            
            <Nav.Link as={Link} to="/user/upload-resume">
              Resume
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

export default UserNavbar;
