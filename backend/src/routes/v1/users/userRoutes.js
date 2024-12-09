import express from "express";
import { getUserContacts } from "../controllers/userController";

const router = express.Router();

router.get("/contacts/:userId", getUserContacts);

export default router;
