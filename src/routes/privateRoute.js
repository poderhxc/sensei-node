import { Route } from "react-router-dom"
import SignatureIdPage from "../pages/SignatureIdPage";

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
                        <Route key={path} path={path} exact={exact} component={SignatureIdPage} />
                    )
                })
            }
        </>
    )
}

export default PrivateRoute;