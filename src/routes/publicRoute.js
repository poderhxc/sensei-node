import { lazy } from "react";

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutUsPage = lazy(() => import('../pages/AboutUsPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));

export const publicRoute = [
    {
        path: "/",
        component: HomePage,
        exact: true
    },
    {
        path: "/about-us",
        component: AboutUsPage,
        exact: true
    },
    {
        path: "/services",
        component: ServicesPage,
        exact: true
    },
    {
        path: "/contact",
        component: ContactPage,
        exact: true
    },
]