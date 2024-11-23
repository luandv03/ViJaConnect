import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/Header";

export default function LayoutApp() {
    return (
        <div>
            {/* <div className="w-full bg-red-400 h-20">Header</div> */}
            <Header />
            <div className="flex">
                <div className="min-w-96 bg-slate-400">Sidebar</div>

                {/* Content Body */}
                <div className="flex-1">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
