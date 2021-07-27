import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
      <Container fluid="sm">
        <Link className="navbar-brand" to="/">
          Simple Blog
        </Link>
        <Navbar.Toggle aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
          <Nav className="me-auto">
            <Link className="nav-link active" to="/login">
              Login
            </Link>
            <Link className="nav-link active" to="/register">
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
