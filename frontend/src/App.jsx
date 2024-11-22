import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LayoutApp, Home, NotFound, CreatePostTest } from "./pages";
import routes from "./routes";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutApp />,
            errorElement: <NotFound />,
            children: routes,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
