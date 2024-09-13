import express from "express";
import { ApplicanatsReport } from "../controllers/reportController.js";

const router = express.Router();

router.post("/ApplicantsReport", ApplicanatsReport);

export default router;
