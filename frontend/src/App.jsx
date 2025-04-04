import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import routes from "./routes";
import { LayoutApp, NotFound, SignIn } from "./pages";
import { authService } from "./services/auth.service";

function App() {
    async function getLocation() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await authService.saveLocation({
                    text: `Latitude:${latitude} Longitude:${longitude}`,
                });
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    }

    useEffect(() => {
        getLocation();
    }, []);

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
