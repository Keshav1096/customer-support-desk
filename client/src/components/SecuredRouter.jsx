import React from "react";
import { Route, Redirect } from "react-router-dom";
import HomeLayout from "./HomeLayout";

export default function SecuredRouter({
  isAuth,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={() => {
        if (isAuth) {
          return <HomeLayout component={Component} />;
        } else {
          return <Redirect to={{ pathname: "/login" }} />;
        }
      }}
    />
  );
}
