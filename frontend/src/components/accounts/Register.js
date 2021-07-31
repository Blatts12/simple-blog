import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../redux/actions/auth";
import { pushMsg } from "../../redux/actions/msg";

const Register = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();

  const nameToSetState = {
    username: setUsername,
    email: setEmail,
    password: setPassword,
    password2: setPassword2,
  };

  const onChange = (e) => nameToSetState[e.target.name](e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      dispatch(pushMsg("info", "Fill empty fields"));
    } else if (password !== password2) {
      dispatch(pushMsg("info", "Passwords do not match"));
    } else {
      dispatch(register({ username, email, password }));
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
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onChange}
            value={email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={onChange}
            value={password}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password2"
            onChange={onChange}
            value={password2}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </Container>
  );
};

export default Register;
