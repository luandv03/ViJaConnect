import { Link } from "react-router-dom";
import { EventItem, EventCreate } from "../components/Event";
import { useContext, useEffect, useState } from "react";
import { eventService } from "../services/event.service";
import { AuthContext } from "../providers/AuthProvider";

const Event = () => {
    const { profile } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        eventService.fetchEvents().then((data) => setEvents(data.data));
    }, []);
    console.log(profile.role_id.name);

    return (
        <>
            <div>
                <div className="px-8 py-4">
                    {profile.role_id.name == 'Admin' || profile.role_id.name == 'Manager' && <EventCreate />}
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
