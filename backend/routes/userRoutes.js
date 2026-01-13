import express from "express";
import { getProfile } from "../controller/userController.js";
import { protect } from "../middleware/authRoutes.js";

const router = express.Router();

router.get("/me", protect, getProfile);

export default router;
