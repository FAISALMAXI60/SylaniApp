import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


export const PublicRoute = ({
  auth,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      auth === true ? (
        <Redirect to="/dashboard" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(PublicRoute);

