import {
    IconBell,
    IconBellFilled,
    IconBrandMessenger,
    IconDiamondsFilled,
    IconPlus,
    IconSettings,
} from "@tabler/icons-react";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import Notification from "../Notification";
import { AuthContext } from "../../providers/AuthProvider";
import BadgeModal from "../Modal";

const ActionMenu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const isChat = location.pathname === "/chat";
    const [showNotification, setShowNotification] = useState(false);
    const { isAuthenticated, profile, setIsAuthenticated, setProfile } =
        useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("profile");
        localStorage.removeItem("isAuthenticated");

        setIsAuthenticated(false);
        setProfile({});
    };

    return (
        <>
            <div className="flex justify-between items-center space-x-6">
                <Link
                    to="/chat"
                    className={`hover:scale-110 hover:text-blue-500 transition-transform duration-300 ease-in-out ${isChat ? "text-blue-500" : ""
                        }`}
                >
                    <IconBrandMessenger stroke={2} />
                </Link>
                <IconPlus stroke={2} />
                <div className="relative">
                    <button
                        onClick={() => setShowNotification(!showNotification)}
                        className="relative"
                    >
                        {showNotification ? (
                            <IconBellFilled stroke={2} className="text-blue-500" />
                        ) : (
                            <IconBell stroke={2} />
                        )}
                        {/* Badge thông báo */}
                        <span className="absolute bottom-3 left-3 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            3
                        </span>
                    </button>
                    {/* Modal thông báo */}
                    {showNotification && <Notification />}
                </div>
                <Link to="/setting">
                    <IconSettings stroke={2} />
                </Link>
                <IconDiamondsFilled className="text-teal-500" onClick={() => setIsModalOpen(true)} />
                {isAuthenticated ? (
                    <>
                        <Link
                            to="/profile"
                            className="rounded-full bg-slate-400 h-10 w-10 overflow-hidden"
                        >
                            <img
                                src={profile.avatar_link}
                                className="w-full h-full object-cover"
                            />
                        </Link>
                        <button
                            onClick={() => handleLogout()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                        Sign In
                    </button>
                )}
            </div>
            <BadgeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default ActionMenu;
