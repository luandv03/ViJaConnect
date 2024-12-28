import { createContext, useState, useContext } from "react";
import { eventService } from "../services/event.service";

const EventContext = createContext();

// eslint-disable-next-line react/prop-types
export const EventProvider = ({ children }) => {
    const [participants, setParticipants] = useState([]);

    const refreshParticipants = async (eventId) => {
        try {
            const data = await eventService.fetchUserJoinEvent(eventId);
            setParticipants(data.data);
        } catch (error) {
            console.error("Failed to refresh participants:", error);
        }
    };

    return (
        <EventContext.Provider value={{ participants, refreshParticipants }}>
            {children}
        </EventContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEvent = () => useContext(EventContext);
