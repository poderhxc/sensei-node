import HomePage from "../pages/HomePage"
import AboutUsPage from "../pages/AboutUsPage"
import ServicesPage from "../pages/ServicesPage"
import ContactPage from "../pages/ContactPage"
import ErrorPage from "../pages/ErrorPage"

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