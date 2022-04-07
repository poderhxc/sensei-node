import { lazy } from "react"

const HomePage = lazy(() => import("../pages/HomePage"));

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