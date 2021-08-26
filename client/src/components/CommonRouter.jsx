import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function SecuredRouter({
  isAuth = false,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={() => {
        if (isAuth) {
          return <Redirect to={{ pathname: "/" }} />;
        } else {
          return <Component />;
        }
      }}
    />
  );
}
