import { RPTScheduleDetails } from "../services/reportService.js";

export const ApplicanatsReport = async (req, res) => {
  try {
    const report = await RPTScheduleDetails();
    res.setHeader("Content-Length", report.length);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "RPTScheduleDetails.pdf");
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.send(report);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
