// src/routes/v1/events/event.route.js
import { Router } from "express";
import { EventController } from "../../../controllers/events/event.controller.js";

const eventRoutes = Router();
const eventController = new EventController();

eventRoutes.get("/events", eventController.getEvents);
eventRoutes.get("/events/:id", eventController.getEventById); // Route for specific event
eventRoutes.post("/events", eventController.createEvent); // Route to create a new event
eventRoutes.put("/events/:id", eventController.updateEvent); // Route to update an event by ID
eventRoutes.delete("/events/:id", eventController.deleteEvent); // Route to delete an event by ID


export default eventRoutes;
