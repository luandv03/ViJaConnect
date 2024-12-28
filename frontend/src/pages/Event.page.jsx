import { Link } from "react-router-dom";
import { EventItem, EventCreate } from "../components/Event";
import { useContext, useEffect, useState } from "react";
import { eventService } from "../services/event.service";
import { AuthContext } from "../providers/AuthProvider";

const Event = () => {
    const { profile } = useContext(AuthContext);
    const [events, setEvents] = useState([]);

    // Hàm refreshEvents để làm mới danh sách sự kiện
    const refreshEvents = async () => {
        try {
            const data = await eventService.fetchEvents();
            setEvents(data.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    // Gọi refreshEvents khi component được mount
    useEffect(() => {
        refreshEvents();
    }, []);

    return (
        <>
            <div>
                <div className="px-8 py-4">
                    {/* Chỉ hiển thị EventCreate nếu user là Admin hoặc Manager */}
                    {(profile.role_id.name === 'Admin' || profile.role_id.name === 'Manager') && (
                        <EventCreate refreshEvents={refreshEvents} />
                    )}
                    <div>
                        {events.map((item) => (
                            <Link key={item._id} to={`/event/${item._id}`}>
                                <EventItem event={item} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Event;
