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

    async getJoinedUsersEvent(eventId) {
        try {
            const event = await Event.findById(eventId).populate(
                "joined_users"
            );
            if (!event) {
                throw new Error("Event not found");
            }
            return event.joined_users;
        } catch (error) {}
    }

    async createEvent(eventData) {
        try {
            const newEvent = new Event(eventData);
            await newEvent.save();
            return newEvent;
        } catch (error) {
            throw new Error("Error creating event: " + error.message);
        }
    }

    async updateEvent(eventId, eventData) {
        try {
            const updatedEvent = await Event.findByIdAndUpdate(
                eventId,
                eventData,
                { new: true }
            );
            if (!updatedEvent) {
                throw new Error("Event not found or failed to update");
            }
            return updatedEvent;
        } catch (error) {
            throw new Error("Error updating event: " + error.message);
        }
    }

    async deleteEvent(eventId) {
        try {
            const deletedEvent = await Event.findByIdAndDelete(eventId);
            if (!deletedEvent) {
                throw new Error("Event not found or failed to delete");
            }
            return deletedEvent;
        } catch (error) {
            throw new Error("Error deleting event: " + error.message);
        }
    }
}

export const eventService = new EventService();
