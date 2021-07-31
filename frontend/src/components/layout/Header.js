import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const guestLinks = (
    <>
      <Link className="nav-link active" to="/login">
        Login
      </Link>
      <Link className="nav-link active" to="/register">
        Register
      </Link>
    </>
  );

  const authLinks = (
    <>
      <Button variant="info" onClick={() => dispatch(logout())}>
        Logout
      </Button>
      <Navbar.Text>{user && user.username}</Navbar.Text>
    </>
  );

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
      <Container fluid="sm">
        <Link className="navbar-brand" to="/">
          Simple Blog
        </Link>
        <Navbar.Toggle aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
          <Nav className="me-auto">
            {isAuthenticated ? authLinks : guestLinks}
            <Link className="nav-link active" to="/post/4">
              TestPost
            </Link>
            <Link className="nav-link active" to="/post">
              AddPost
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
