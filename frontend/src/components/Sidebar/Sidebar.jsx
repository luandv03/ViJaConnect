import { useLocation } from "react-router-dom";
import MainSidebar from "./MainSidebar";
import ChatSidebar from "./ChatSidebar";
import EventSidebar from "./EventSidebar";

const Sidebar = () => {
    const location = useLocation();

    // Hiển thị Sidebar phù hợp dựa trên URL
    if (location.pathname.includes("/chat")) {
        return <ChatSidebar />;
    } else if (location.pathname.includes("/event/")) {
        return <EventSidebar />;
    }

    return <MainSidebar />;
};

export default Sidebar;
