import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../router/index"
import { RouteNames } from "../../router/types";

export const AppRouter: React.FC = () => {
    const isAuth: boolean = true;

    return (
        isAuth ?
        <Switch>
            {privateRoutes.map(route => <Route key={route.path} {...route} />)}
            <Redirect to={RouteNames.UserList}/>
        </Switch>
        :
        <Switch>
            {publicRoutes.map(route => <Route key={route.path} {...route} />)}
            <Redirect to={RouteNames.Login}/>
        </Switch>
    );
}