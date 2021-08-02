import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth";
import { pushMsg } from "../../redux/actions/msg";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const nameToSetState = {
    username: setUsername,
    password: setPassword,
  };

  const onChange = (e) => nameToSetState[e.target.name](e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login(username, password));
    } else {
      dispatch(pushMsg("info", "Fill empty fields"));
    }
  };

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Container className="mt-3" fluid="sm">
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={onChange}
            value={username}
          />
        </Form.Group>
        <Form.Group className="mt-1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={onChange}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Login
        </Button>
      </Form>
      <p className="mt-2">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Container>
  );
};

export default Login;
