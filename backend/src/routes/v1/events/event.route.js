// src/routes/v1/events/event.route.js
import { Router } from "express";
import { EventController } from "../../../controllers/events/event.controller.js";

const eventRoutes = Router();
const eventController = new EventController();

eventRoutes.get("/events", eventController.getEvents);
eventRoutes.get("/events/:id", eventController.getEventById); // Route for specific event

export default eventRoutes;
