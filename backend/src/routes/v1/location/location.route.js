import { Router } from "express";
import { LocationController } from "../../../controllers/location/location.controller.js";

const locationRoutes = Router();
const locationController = new LocationController();

locationRoutes.post("/location/save", locationController.saveLocation); // Route to save a new location

locationRoutes.get("/location/get", locationController.getAllLocations); // Route to get all locations

export default locationRoutes;
