import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutUsPage = lazy(() => import('../pages/AboutUsPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));

const Routes = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about-us" component={AboutUsPage} />
        <Route exact path="/services" component={ServicesPage} />
        <Route exact path="/contact" component={ContactPage} />

        <Route component={_ => <ErrorPage status={404} message="Page not found." />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
