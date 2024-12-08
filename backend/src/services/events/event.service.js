// src/services/events/event.service.js
import { Event } from "../../models/event.model.js";

class EventService {
  async getEvents() {
    try {
      const events = await Event.find({});
      return events;
    } catch (error) {
      throw new Error("Error fetching events: " + error.message);
    }
  }

  async getEventById(eventId) {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      return event;
    } catch (error) {
      throw new Error("Error fetching event: " + error.message);
    }
  }
}

export const eventService = new EventService();
