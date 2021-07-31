import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const BloggerRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else if (!auth.user.groups.some((g) => g.name === "Blogger")) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default BloggerRoute;
