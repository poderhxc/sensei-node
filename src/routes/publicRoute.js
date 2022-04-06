import HomePage from "../pages/HomePage"

export const publicRoute = [
    {
        path: "/",
        component: HomePage,
        exact: true,
    },
    {
      path: "/:locale",
      component: HomePage,
      exact: true,
  }   
]