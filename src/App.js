import React, { Suspense } from 'react';

import AppLayout from './layouts/AppLayout';
import ThemeProvider from './contexts/ThemeContext';
import './styles/index.scss';
import { Route, Router, Switch } from 'react-router-dom';
import { publicRoute } from './routes/publicRoute';
import SuperRoute from './routes/newIndex';
import PrivateRoute from './routes/privateRoute';


function App() {
  const publicRoutes = [
    '/',
    '/about-us',
    '/services',
    '/contact',
  ];
  const privateRoutes = [
    '/signature/:id'
  ];
  return (
    <Suspense fallback={<div />}>
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
  </Suspense>
  );
}

export default App;
