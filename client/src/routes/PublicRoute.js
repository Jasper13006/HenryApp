import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isToken,
    component: Component,
    ...rest
}) => {

    return (
        <Route {...rest}
            component={(props) => {
                if (!isToken) {                    
                    localStorage.clear();
                    return (<Component {...props} />)
                } else {                    
                    return (<Redirect to="/panel" />)
                }
            }}
        />
    )
}

PublicRoute.propTypes = {    
    isToken: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired
}