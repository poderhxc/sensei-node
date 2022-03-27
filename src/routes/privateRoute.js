import { lazy } from "react";
import { Route } from "react-router-dom"

const SignatureIdPage = lazy(() => import('../pages/SignatureIdPage'));

const privateRoutes = [
    {
        path: "/signature/:id",
        component: SignatureIdPage,
        exact: true
    }
]

const PrivateRoute = () => {
    return (
        <>
            {
                privateRoutes.map(({ path, component, exact }) => {
                    return (
                        <Route key={path} path={path} exact={exact} component={component} />
                    )
                })
            }
        </>
    )
}

export default PrivateRoute;