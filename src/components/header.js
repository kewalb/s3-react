import React from "react";
import {Container, Navbar, Nav} from 'react-bootstrap';

import {Link} from 'react-router-dom'

function Header() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">MyDrive</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{margin:10}}>
            <Nav ><Link to="/" style={{ color: 'white', textDecoration: 'inherit', margin:10}}>Home</Link></Nav>
            <Nav ><Link to="/login" style={{ color: 'white', textDecoration: 'inherit', margin:10}}>Login</Link></Nav>
            <Nav><Link to="/register" style={{ color: 'white', textDecoration: 'inherit', margin:10}}>Register</Link></Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;