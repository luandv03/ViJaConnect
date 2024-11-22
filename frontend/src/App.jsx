import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";
import { LayoutApp, NotFound } from "./pages";

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
