// src/controllers/events/event.controller.js
import { eventService } from "../../services/events/event.service.js";

export class EventController {
  async getEvents(req, res) {
    try {
      const events = await eventService.getEvents();
      return res.json({
        status: 200,
        message: "Events fetched successfully",
        data: events,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Failed to fetch events",
        error: error.message,
      });
    }
  }

  async getEventById(req, res) {
    try {
      const eventId = req.params.id;
      const event = await eventService.getEventById(eventId);
      return res.json({
        status: 200,
        message: "Event fetched successfully",
        data: event,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Failed to fetch event",
        error: error.message,
      });
    }
  }
}
