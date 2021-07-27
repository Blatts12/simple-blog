import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./layout/Header";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Home from "./layout/Home";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
