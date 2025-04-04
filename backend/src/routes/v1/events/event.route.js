// src/routes/v1/events/event.route.js
import { Router } from "express";
import { EventController } from "../../../controllers/events/event.controller.js";

const eventRoutes = Router();
const eventController = new EventController();

eventRoutes.get("/event/get", eventController.getEvents);
eventRoutes.get("/event/get/search", eventController.getEventByTitle); // Route to search for events by title
eventRoutes.get("/event/get/:id", eventController.getEventById); // Route for specific event
eventRoutes.get(
    "/event/get/joined_user/:id",
    eventController.getJoinedUsersEvent
); // Route to get users joined an event

// get events user joined
eventRoutes.get(
    "/event/get/user_joined/:userId",
    eventController.getEventUserJoined
);

// get events user created
eventRoutes.get(
    "/event/get/user_created/:userId",
    eventController.getEventUserCreated
);

// join event
eventRoutes.put("/event/join/:eventId/:userId", eventController.joinEvent);

// leave event
eventRoutes.put("/event/leave/:eventId/:userId", eventController.leaveEvent);

// cancel event
eventRoutes.put("/event/cancel/:id", eventController.cancelEvent);

eventRoutes.post("/event/create", eventController.createEvent); // Route to create a new event
eventRoutes.put("/event/edit/:id", eventController.updateEvent); // Route to update an event by ID
eventRoutes.delete("/event/delete/:id", eventController.deleteEvent); // Route to delete an event by ID

export default eventRoutes;
