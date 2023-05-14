import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  assetType: { type: String, required: true },
  quantity: { type: Number, required: true },
  functional: { type: Number, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const assetModel = mongoose.model("Asset", AssetSchema);

export default assetModel;
