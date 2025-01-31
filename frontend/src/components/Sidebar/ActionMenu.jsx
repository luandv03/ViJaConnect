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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
            <div className="flex justify-between items-center space-x-6 relative">
                <Link
                    to="/chat"
                    className={`hover:scale-110 hover:text-blue-500 transition-transform duration-300 ease-in-out ${
                        isChat ? "text-blue-500" : ""
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
                            <IconBellFilled
                                stroke={2}
                                className="text-blue-500"
                            />
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
                <IconDiamondsFilled
                    className="text-teal-500"
                    onClick={() => setIsModalOpen(true)}
                />
                {isAuthenticated ? (
                    <>
                        <div
                            onClick={toggleDropdown}
                            className="cursor-pointer rounded-full bg-slate-400 h-10 w-10 overflow-hidden"
                        >
                            <img
                                src={profile.avatar_link}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {isDropdownOpen && (
                            <div
                                className="absolute top-12 right-0 w-48 bg-white rounded-md shadow-lg z-50"
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    プロフィール
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    ログアウト
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <button className="min-w-28 bg-blue-500 text-white px-4 py-2 rounded-full">
                        ログイン
                    </button>
                )}
            </div>
            <BadgeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ActionMenu;
