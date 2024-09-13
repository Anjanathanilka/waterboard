import express from "express";
import {
  downloadFile,
  getCommonAppData,
} from "../controllers/CommonController.js";
import {
  getAllVacancies,
  getVacancyBySearch,
} from "../controllers/VacancyController.js";

const router = express.Router();

router.get("/", getAllVacancies);
// router.post("/createVacancy", createVacancy);
router.get("/search", getVacancyBySearch);
router.post("/pdfDownload", downloadFile);
router.get("/masterData", getCommonAppData);

export default router;
