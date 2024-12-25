import { Outlet } from "react-router-dom";
import { Suspense, useContext } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import SignIn from "./SignIn.page";
import { AuthContext } from "../providers/AuthProvider";

export default function LayoutApp() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div>
            {/* <div className="w-full bg-red-400 h-20">Header</div> */}
            <Header />
            <div className="flex">
                <div className="fixed min-w-96 border-r border-gray-200 max-h-screen top-16">
                    <Sidebar />
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto ml-96 mt-16">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </div>

                {/* Modal login */}
                {isAuthenticated ? null : (
                    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-over-layer mt-0">
                        <SignIn />
                    </div>
                )}
            </div>
        </div>
    );
}
