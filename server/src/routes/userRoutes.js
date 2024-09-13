import express from "express";
import { signup, signin } from "../controllers/userController.js";

// import auth from "../middleware/auth.js";

const router = express.Router();

//router.get("/signin", signin);
router.post("/signin", signin);
router.post("/signup", signup);
// router.post("/menus", getMenu);

export default router;
