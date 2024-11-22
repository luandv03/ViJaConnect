import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes from "./routes"; // fixing
import { LayoutApp, Home, NotFound, CreatePostTest } from "./pages";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutApp />,
            errorElement: <NotFound />,
            children: [
                {
                    path: "home",
                    element: <Home />,
                    path: "test",
                    element: <CreatePostTest />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
