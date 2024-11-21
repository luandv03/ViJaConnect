import React from "react";

const Home = React.lazy(() => import("../pages/Home.page"));

const routes = [
    {
        path: "home",
        element: <Home />,
    },
];

export default routes;
