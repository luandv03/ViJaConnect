import { createContext, useState, useContext, useCallback } from "react";
import { eventService } from "../services/event.service";

const EventContext = createContext();

// eslint-disable-next-line react/prop-types
export const EventProvider = ({ children }) => {
    const [participants, setParticipants] = useState([]);

    const refreshParticipants = useCallback(async (eventId) => {
        try {
            if (eventId) { // Đảm bảo chỉ gọi API khi có eventId
                const data = await eventService.fetchUserJoinEvent(eventId);
                setParticipants(data.data);
            }
        } catch (error) {
            console.error("Failed to refresh participants:", error);
        }
    }, []); // Không có dependency nào khác ngoài state cố định

    return (
        <EventContext.Provider value={{ participants, refreshParticipants }}>
            {children}
        </EventContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEvent = () => useContext(EventContext);
