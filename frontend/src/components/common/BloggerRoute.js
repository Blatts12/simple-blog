import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const BloggerRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth, shallowEqual);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else if (
          auth.user.groups.some((g) => g.name === "Blogger") ||
          auth.user.is_staff
        ) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default BloggerRoute;
