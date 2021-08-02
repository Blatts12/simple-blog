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
      <a
        className="nav-link active"
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(logout())}
      >
        Logout
      </a>
      <Navbar.Text className="ms-2">
        {user && ` Logged in as ${user.username}`}
      </Navbar.Text>
    </>
  );

  const bloggerLinks = (
    <Link className="nav-link active" to="/add_post">
      Add post
    </Link>
  );

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
      <Container fluid="sm">
        <Link className="navbar-brand" to="/">
          Simple Blog
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {(user?.groups?.some((g) => g.name === "Blogger") ||
            user?.is_staff) &&
            bloggerLinks}
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
