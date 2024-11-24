import React from "react";

const Home = React.lazy(() => import("../pages/Home.page"));
const CreatePostTest = React.lazy(() => import("../pages/CreatePostTest.page"));
const PostDetailPage = React.lazy(() => import("../pages/PostDetailPage.page"));

const routes = [
    {
        index: true,
        element: <Home />,
    },
    {
        path: "test",
        element: <CreatePostTest />,
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
    }
];

export default routes;
