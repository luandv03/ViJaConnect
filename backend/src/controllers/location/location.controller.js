import { Location } from "../../models/location.model.js";

export class LocationController {
    async saveLocation(req, res) {
        try {
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({
                    status: 400,
                    message: "Location text is required",
                });
            }

            const newLocation = await Location.create({ text });

            return res.status(201).json({
                status: 201,
                message: "Location saved successfully",
                data: newLocation,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to fetch locations",
                error: error.message,
            });
        }
    }

    async getAllLocations(req, res) {
        try {
            const locations = await Location.find({}).sort({ createdAt: -1 });

            return res.status(200).json({
                status: 200,
                message: "Locations fetched successfully",
                data: locations,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Failed to fetch locations",
                error: error.message,
            });
        }
    }
}
