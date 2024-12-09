import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export default function LayoutApp() {
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
            </div>
        </div>
    );
}
