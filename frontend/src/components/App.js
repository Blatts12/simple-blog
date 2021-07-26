import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Alert } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <>
        <Alert variant="primary">Siema to ja Zbychu</Alert>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
