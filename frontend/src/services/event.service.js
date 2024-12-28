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
      const res = await this.httpClientPublic.get(`/event/get/${eventId}`);

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
}

export const eventService = new EventService();
