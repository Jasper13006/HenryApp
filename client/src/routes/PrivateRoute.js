import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    isToken,
    component: Component,
    ...rest
}) => {

    return (
        <Route {...rest}
            component={(props) => {
                if (isToken) {                    
                    return (<Component {...props} />)
                } else {
                    localStorage.clear();
                    return (<Redirect to="/login" />)
                }
            }}
        />
    )
}

PrivateRoute.propTypes = {    
    isToken: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired
}