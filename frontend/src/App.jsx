import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";
import { LayoutApp, NotFound, SignIn } from "./pages";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutApp />,
            errorElement: <NotFound />,
            children: routes,
        },
        {
            path: "/sign-in",
            element: <SignIn />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
