import { uploadService } from "../../services/upload/upload.service.js";

export class UploadController {
  async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "No file uploaded"
        });
      }

      const result = await uploadService.uploadImage(req.file);
      return res.json({
        status: 200,
        message: "Image uploaded successfully",
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Failed to upload image",
        error: error.message
      });
    }
  }
}
