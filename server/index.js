import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet"; // for http header security
import morgan from "morgan"; // request loggers
import sql from "mssql";
import multer from "multer"; // for file uploads

import DBconfig from "./dbconfig.js";
import {
  addAchvDetails,
  addEduDetails,
  addExpDetails,
  uploadApplicationDocs,
} from "./src/controllers/applicationController.js";
import { createVacancy } from "./src/controllers/VacancyController.js";
import applicationRoutes from "./src/routes/applicationRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

import path from "path";
import { fileURLToPath } from "url";
import commonRoutes from "./src/routes/commonRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// app.use(cors());
// app.use(bodyParser.json());
const appPool = new sql.ConnectionPool(DBconfig);

dotenv.config();
app.use(express.json());

app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post(
  "/application/addEduDetails",
  upload.single("attachment"),
  addEduDetails
);
app.post(
  "/application/addExpDetails",
  upload.single("attachment"),
  addExpDetails
);

app.post(
  "/application/addAchvDetails",
  upload.single("attachment"),
  addAchvDetails
);

app.post(
  "/application/uploadDocs",
  upload.single("document"),
  uploadApplicationDocs
);

app.post("/vacancy/createVacancy", upload.single("attachment"), createVacancy);

/* ROUTES */
app.use("/user", userRoutes);
app.use("/application", applicationRoutes);
app.use("/vacancy", commonRoutes);
app.use("/download", commonRoutes);
app.use("/common", commonRoutes);
app.use("/report", reportRoutes);

/* SERVER CONFIG */
var port = process.env.PORT || 8080;
// var io;
console.log(port);
appPool
  .connect()
  .then(function (pool) {
    app.locals.db = pool;
    const server = app.listen(port, function () {
      const host = server.address().address;
      const port = server.address().port;
      console.log(
        "QuickRec Backend Server is Running at http://%s:%s",
        host,
        port
      );
    });
    // io = socket(server);
  })
  .catch(function (err) {
    console.error("ERROR starting server ", err);
  });

// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });
// /* SOCKET.IO ESTABLISHED */
// io.on("connection", (socket) => {
//   console.log(`New socket connection established with ID ${socket.id} `);
//   sendData(socket);
// });

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
