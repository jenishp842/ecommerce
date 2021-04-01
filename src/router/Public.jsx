/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const userData = JSON.parse(localStorage.getItem('jwtToken'));
  let token;
  if (userData == null || userData == '') {
    token = null;
  } else {
    token = userData.accessToken.jwtToken;
  }

  const isLogin = () => {
    if (token != null) {
      return true;
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        isLogin() && restricted
          ? <Redirect to="/dashboard" />
          : <Component {...props} />
      )}
    />
  );
};

export default PublicRoute;
