import express from "express";
import { signup, signin, adminSignin } from "../controllers/userController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/admin/signin", adminSignin);  // New admin signin route

export default router;