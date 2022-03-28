import { Route, Switch } from 'react-router-dom';
import PrivateRoute from "../src/routes/privateRoute";

function App () {
    const privateRoutes = [
        '/signature/:id'
    ];
    return (
        <Switch>
            <Route exact path={privateRoutes} component={PrivateRoute}/>
        </Switch>
    );
};
export default App;