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

    async getJoinedUsersEvent(req, res) {
        try {
            const eventId = req.params.id;
            const events = await eventService.getJoinedUsersEvent(eventId);
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

    async getEventByTitle(req, res) {
        try {
            const { title } = req.query;
            const events = await eventService.getEventByTitle(title);
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

    async getEventUserJoined(req, res) {
        try {
            const { userId } = req.params;
            const events = await eventService.getEventUserJoined(userId);
            return res.json({
                status: 200,
                message: "Get event user joined successfully",
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

    async createEvent(req, res) {
        try {
            const { title, desc, location, date, banner_link, author_id } =
                req.body;

            if (!title || !date) {
                return res.status(400).json({
                    status: 400,
                    message: "Title and date are required",
                });
            }

            const newEvent = await eventService.createEvent({
                title,
                desc,
                location,
                date,
                author_id,
                banner_link,
            });

            return res.status(201).json({
                status: 201,
                message: "Event created successfully",
                data: newEvent,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to create event",
                error: error.message,
            });
        }
    }

    async updateEvent(req, res) {
        try {
            const eventId = req.params.id;
            const { title, desc, location, date, banner_link } = req.body;

            const updatedEvent = await eventService.updateEvent(eventId, {
                title,
                desc,
                location,
                date,
                banner_link,
            });

            return res.json({
                status: 200,
                message: "Event updated successfully",
                data: updatedEvent,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to update event",
                error: error.message,
            });
        }
    }

    async deleteEvent(req, res) {
        try {
            const eventId = req.params.id;

            const deletedEvent = await eventService.deleteEvent(eventId);

            return res.json({
                status: 200,
                message: "Event deleted successfully",
                data: deletedEvent,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to delete event",
                error: error.message,
            });
        }
    }
}
