import express from "express";
import { createExpense } from "../controller/expController.js";
import {protect} from "../middleware/authRoutes.js";

const router = express.Router();

router.post("/expenses", protect, createExpense);

export default router;