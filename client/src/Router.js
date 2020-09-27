import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Public from './components/Public';
import Protected from './components/Protected';
import Auth from './Auth';



function Router (props) {
    return (
        <Switch userId={props.userId} setUserId={props.setUserId} >
            <PublicRoute exact path='/public' component={Public} userId={props.userId} setUserId={props.setUserId} />
            <PrivateRoute path='/protected' component={Protected} userId={props.userId} setUserId={props.setUserId} />     
        </Switch>
    )
}

const PublicRoute = ({ component: Component, ...rest}) => (
    <Route
        {...rest}
        render={routeProps =>
            <Component {...routeProps} {...rest} />
        }
    />
)

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route
        {...rest}
        render={routeProps =>
            Auth.getAuth() ? (
                <Component {...routeProps} {...rest} />
            ) : (
                <Redirect
                    to={{
                        pathname:'/'
                    }}
                />
            )
        }
    />
)

export default Router;