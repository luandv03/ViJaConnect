import { useLocation } from "react-router-dom";
import MainSidebar from "./MainSidebar";
import ChatSidebar from "./ChatSidebar";

const Sidebar = () => {
    const location = useLocation();

    // Hiển thị Sidebar phù hợp dựa trên URL
    if (location.pathname === "/chat") {
        return <ChatSidebar />;
    }

    return <MainSidebar />;
};

export default Sidebar;
