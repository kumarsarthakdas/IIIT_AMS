import express from "express";

import { getAllLogs } from "../controllers/log.controller.js";

const router = express.Router();

router.route("/").get(getAllLogs);

export default router;
