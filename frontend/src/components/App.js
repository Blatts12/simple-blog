import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Header from "./layout/Header";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Feed from "./blog/feed/Feed";
import { loadUser } from "../redux/actions/auth";
import Toasts from "./layout/Toasts";
import Post from "./blog/post/Post";
import AddPostForm from "./blog/post/AddPostForm";
import BloggerRoute from "./common/BloggerRoute";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Toasts />
          <Header />
          <Route exact path="/" component={Feed} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <BloggerRoute exact path="/add_post" component={AddPostForm} />
          <Route exact path="/post/:id" component={Post} />
        </>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
