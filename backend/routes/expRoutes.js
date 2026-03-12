import express from "express";
import { createExpense ,getExpenses} from "../controller/expController.js";
import {protect} from "../middleware/authRoutes.js";

const router = express.Router();

router.post("/expenses", protect, createExpense);
router.get("/expenses",protect, getExpenses);

export default router;