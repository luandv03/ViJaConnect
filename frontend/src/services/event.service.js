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

    async fetchEventsUserJoined(userId) {
        try {
            const res = await this.httpClientPublic.get(
                `/event/get/user_joined/${userId}`
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }

    async fetchEventsUserCreated(userId) {
        try {
            const res = await this.httpClientPublic.get(
                `/event/get/user_created/${userId}`
            );

            return res.data;
        } catch (error) {
            return error;
        }
    }
}

export const eventService = new EventService();
