import React from "react";

const Home = React.lazy(() => import("../pages/Home.page"));
const PostDetailPage = React.lazy(() => import("../pages/PostDetailPage.page"));
const Profile = React.lazy(() => import("../pages/Profile.page"));

const routes = [
    {
        index: true,
        element: <Home />,
    },
    {
        path: "post/:postId",
        element: <PostDetailPage />,
    },
    {
        path: "topic/:topicId",
        element: <Home />,
    },
    {
        path: "event",
        element: <Home />,
    },
    {
        path: "profile",
        element: <Profile />,
    },
];

export default routes;
