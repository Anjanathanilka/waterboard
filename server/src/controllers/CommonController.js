import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMasterData } from "../services/commonDataService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadFile = (req, res) => {
  try {
    const fileURL = `${path.join(__dirname, "../../")}\\public\\assets\\${
      req.body.fileName
    }`;
    var file = fs.createReadStream(fileURL);
    var stat = fs.statSync(fileURL);
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + req.body.fileName
    );
    file.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "File Download is corrupted" });
  }
};

const getCommonAppData = async (req, res) => {
  try {
    const data = await getMasterData(req);
    res.status(200).json({ data: data.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { downloadFile, getCommonAppData };
