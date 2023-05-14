import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  assetName: { type: String, required: true },
  assetStatus: { type: String, required: true },
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  creatorName: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  logDate: { type: String, required: true },
});

const logModel = mongoose.model("Log", LogSchema);

export default logModel;
