import { BaseService } from "./base.service";

class EventService extends BaseService {
    async fetchEvents() {
        try {
            const res = await this.httpClientPublic.get("/event/get");

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async fetchEventById(eventId) {
        try {
            console.log("Event ID:", eventId);
            const res = await this.httpClientPublic.get(
                `/event/get/${eventId}`
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async fetchUserJoinEvent(eventId) {
        try {
            const res = await this.httpClientPublic.get(
                `/event/get/joined_user/${eventId}`
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async fetchEventsUserJoined(eventId) {
        try {
            const res = await this.httpClientPublic.get(
                `/event/get/user_joined/${eventId}`
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async fetchEventsUserCreated(eventId) {
        try {
            const res = await this.httpClientPublic.get(
                `/event/get/user_created/${eventId}`
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }

    // Đặt các phương thức bên ngoài
    async joinEvent(eventId, userId) {
        try {
            const res = await this.httpClientPublic.put(
                `/event/join/${eventId}/${userId}`
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async leaveEvent(eventId, userId) {
        try {
            const res = await this.httpClientPublic.put(
                `/event/leave/${eventId}/${userId}`
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async cancelEvent(eventId, reasonCancel) {
        try {
            const res = await this.httpClientPublic.put(
                `/event/cancel/${eventId}`,
                {
                    reasonCancel,
                }
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async createEvent({ author_id, title, desc, location, date, banner_link }) {
        try {
            const res = await this.httpClientPublic.post("/event/create", {
                author_id: author_id,
                title: title,
                desc: desc,
                location: location,
                date: date,
                banner_link: banner_link,
            });

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async updateEvent(eventId, { title, desc, location, date, banner_link }) {
        try {
            const res = await this.httpClientPublic.put(
                `/event/edit/${eventId}`,
                {
                    title: title,
                    desc: desc,
                    location: location,
                    date: date,
                    banner_link: banner_link,
                }
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }
}

export const eventService = new EventService();
