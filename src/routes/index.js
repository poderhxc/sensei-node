import React from "react";
import { Route as ReactRouterRoute } from "react-router-dom";

const SuperRoute = ({component: Component, ...props}) => {
    return (
        <ReactRouterRoute {...props} render={(props) => <Component {...props} />} />
    );
}
export default SuperRoute;
