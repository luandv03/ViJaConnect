import { Outlet } from "react-router-dom";

export default function LayoutApp() {
    return (
        <div>
            <div className="w-full bg-red-400 h-20">Header</div>
            <div className="flex">
                <div className="min-w-96 bg-slate-400">Sidebar</div>

                {/* Content Body */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
