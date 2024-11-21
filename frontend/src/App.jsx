import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes from "./routes"; // fixing
import { LayoutApp, Home, NotFound } from "./pages";

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
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
