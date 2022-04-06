import React from 'react';

import AppLayout from './layouts/AppLayout';
import ThemeProvider from './contexts/ThemeContext';
import { Route, Switch } from 'react-router-dom';
import { publicRoute } from './routes/publicRoute';
import SuperRoute from './routes';
import PrivateRoute from './routes/privateRoute';
import ErrorBoundary from './components/error-boundary';

import './styles/index.scss';



function App() {
  const publicRoutes = [
    '/',
    '/:locale',
  ];
  const privateRoutes = [
    '/signature/:id'
  ];
  return (
    <ErrorBoundary>
    <Switch>
      <Route exact path={publicRoutes}>
        <ThemeProvider>
          <AppLayout>
            {
              publicRoute.map(({ path, component, exact}) => {
                return (
                  <SuperRoute key={path} path={path} component={component} exact={exact} />
                )
              })
            }
          </AppLayout>
        </ThemeProvider>
      </Route>
      <Route exact path={privateRoutes}>
        <PrivateRoute />
      </Route>
    </Switch>
    </ErrorBoundary>
  );
}

export default App;
