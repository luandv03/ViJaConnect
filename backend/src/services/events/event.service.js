// src/services/events/event.service.js
import { Event } from "../../models/event.model.js";

class EventService {
    async getEvents() {
        try {
            const events = await Event.find({ status: "active" });
            return events;
        } catch (error) {
            throw new Error("Error fetching events: " + error.message);
        }
    }

    async getEventById(eventId) {
        try {
            const event = await Event.findById(eventId)
                .populate({
                    path: "author_id",
                    select: "avatar_link display_name",
                    as: "author",
                })
                .lean();

            // Sửa tên trường author_id thành author
            if (event.author_id) {
                event.author = event.author_id; // Gán dữ liệu của author_id cho author
                event.topic = event.topic_id; // Gán dữ liệu của topic_id cho topic
                delete event.author_id; // Xóa trường author_id
                delete event.topic_id; // Xóa trường topic
            }

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

    async getEventByTitle(title) {
        try {
            const events = await Event.find({
                title: { $regex: title, $options: "i" },
            });

            return events;
        } catch (error) {
            throw new Error("Error fetching events: " + error.message);
        }
    }

    async getEventUserJoined(userId) {
        try {
            const events = await Event.find({
                joined_users: { $in: [userId] },
            });
            return events;
        } catch (error) {
            throw new Error("Error fetching events: " + error.message);
        }
    }

    async getEventUserCreated(userId) {
        try {
            const events = await Event.find({ author_id: userId });
            return events;
        } catch (error) {
            throw new Error("Error fetching events: " + error.message);
        }
    }

    async leaveEvent(eventId, userId) {
        try {
            const event = await Event.findById(eventId);
            if (!event) {
                throw new Error("Event not found");
            }
            event.joined_users = event.joined_users.filter(
                (user) => user.toString() !== userId
            );
            await event.save();
            return event;
        } catch (error) {
            throw new Error("Error leaving event: " + error.message);
        }
    }

    async joinEvent(eventId, userId) {
        try {
            const event = await Event.findById(eventId);
            if (!event) {
                throw new Error("Event not found");
            }
            event.joined_users.push(userId);
            await event.save();
            return event;
        } catch (error) {
            throw new Error("Error joining event: " + error.message);
        }
    }

    async cancelEvent(eventId, reasonCancel) {
        try {
            const event = await Event.findById(eventId);
            if (!event) {
                throw new Error("Event not found");
            }
            event.status = "inactive";
            event.reasonCancel = reasonCancel;
            await event.save();
            return event;
        } catch (error) {
            throw new Error("Error cancelling event: " + error.message);
        }
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

            console.log(updatedEvent);

            if (!updatedEvent) {
                throw new Error("Event not found or failed to update");
            }

            console.log(updatedEvent);

            const event = await Event.findById(eventId)
                .populate({
                    path: "author_id",
                    select: "avatar_link display_name",
                })
                .lean();

            if (event) {
                event.author = event.author_id;
                delete event.author_id;
            }

            return event;
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
