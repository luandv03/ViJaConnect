import React from "react";

const Home = React.lazy(() => import("../pages/Home.page"));
const CreatePostTest = React.lazy(() => import("../pages/CreatePostTest.page"));

const routes = [
    {
        path: "home",
        element: <Home />,
    },
    {
        path: "test",
        element: <CreatePostTest />,
    },
];

export default routes;
