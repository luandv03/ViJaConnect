import { Router } from "express";
import multer from "multer";
import { UploadController } from "../../../controllers/upload/upload.controller.js";

const uploadRoutes = Router();
const uploadController = new UploadController();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for image upload
uploadRoutes.post("/upload/image", upload.single("file"), uploadController.uploadImage);

export default uploadRoutes;
