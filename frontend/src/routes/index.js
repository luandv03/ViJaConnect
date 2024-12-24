import React from "react";
import EventDetail from "../components/Event/EventDetail";
import Setting from "../components/Setting";

const Home = React.lazy(() => import("../pages/Home.page"));
const PostDetailPage = React.lazy(() => import("../pages/PostDetailPage.page"));
const Profile = React.lazy(() => import("../pages/Profile.page"));
const Event = React.lazy(() => import("../pages/Event.page"));
const Chat = React.lazy(() => import("../pages/Chat.page"));

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
        path: "topic",
        element: <Home />,
    },
    {
        path: "topic/:topicId",
        element: <Home />,
    },
    {
        path: "event",
        element: <Event />,
    },
    {
        path: "admin/event",
        element: <Event />,
    },
    {
        path: "profile",
        element: <Profile />,
    },
    {
        path: "chat",
        element: <Chat />,
    },
    {
        path: "admin/event/:eventId",
        element: <EventDetail />,
    },
    {
        path: "manager/event/:eventId",
        element: <EventDetail />,
    },
    {
        path: "event/:eventId",
        element: <EventDetail />,
    },
    {
        path: "setting",
        element: <Setting />
    }
];

export default routes;
