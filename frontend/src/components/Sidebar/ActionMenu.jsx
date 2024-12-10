import {
    IconBell,
    IconBrandMessenger,
    IconPlus,
    IconSettings,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const ActionMenu = () => {
    const location = useLocation();
    const isChat = location.pathname === "/chat";
    return (
        <div className="flex justify-between items-center space-x-6">
            <Link to="/chat" className={`hover:scale-110 hover:text-blue-500 transition-transform duration-300 ease-in-out ${isChat ? 'text-blue-500': ''}`}>
                <IconBrandMessenger stroke={2} />
            </Link>
            <IconPlus stroke={2} />
            <IconBell stroke={2} />
            <IconSettings stroke={2} />
            <Link
                to="/profile"
                className="rounded-full bg-slate-400 h-10 w-10"
            ></Link>
        </div>
    );
};

export default ActionMenu;
