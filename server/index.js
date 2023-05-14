import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import assetRouter from "./routes/asset.routes.js";
import logRouter from "./routes/log.routes.js";
import sendEmail from "./Utils/sendEmail.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to IIIT AMS" });
});

app.post("/api/v1/sendemail", async (req, res) => {
  const { sent_from, sent_to, subject, message } = req.body;
  try {
    await sendEmail(sent_from, sent_to, subject, message);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/assets", assetRouter);
app.use("/api/v1/logs", logRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
