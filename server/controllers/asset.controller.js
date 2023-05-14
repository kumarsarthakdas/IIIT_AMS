import Asset from "../mongodb/models/asset.js";
import User from "../mongodb/models/user.js";
import Log from "../mongodb/models/log.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllAssets = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    assetType = "",
  } = req.query;

  const query = {};

  if (assetType !== "") {
    query.assetType = assetType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const count = await Asset.countDocuments({ query });

    const assets = await Asset.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssetDetail = async (req, res) => {
  const { id } = req.params;
  let assetExists = await Asset.findOne({ _id: id }).populate("creator");
  assetExists = assetExists.toJSON();

  if (assetExists) {
    let date = assetExists.date;
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    assetExists.date = year + "-" + month + "-" + dt;

    res.status(200).json(assetExists);
  } else {
    res.status(404).json({ message: "Asset not found" });
  }
};

const createAsset = async (req, res) => {
  try {
    const {
      title,
      date,
      description,
      assetType,
      quantity,
      functional,
      price,
      photo,
      email,
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newAsset = await Asset.create({
      title,
      date,
      description,
      assetType,
      quantity,
      functional,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allAssets.push(newAsset._id);
    await user.save({ session });

    await session.commitTransaction();

    const newLog = await Log.create({
      assetName: newAsset.title,
      assetStatus: "Created",
      assetId: newAsset._id,
      creatorName: user._id,
      logDate: new Date().toString(),
    });

    res.status(200).json({ message: "Asset created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      date,
      description,
      assetType,
      quantity,
      functional,
      price,
      photo,
      email,
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);
    const photoUrl = await cloudinary.uploader.upload(photo);

    await Asset.findByIdAndUpdate(
      { _id: id },
      {
        title,
        date,
        description,
        assetType,
        quantity,
        functional,
        price,
        photo: photoUrl.url || photo,
      }
    );

    const newLog = await Log.create({
      assetName: title,
      assetStatus: "Edited",
      assetId: id,
      creatorName: user._id,
      logDate: new Date().toString(),
    });

    await session.commitTransaction();

    res.status(200).json({ message: "Asset updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const assetToDelete = await Asset.findById({ _id: id }).populate("creator");

    if (!assetToDelete) throw new Error("Asset not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    // const user = await User.findOne({ email }).session(session);

    const newLog = await Log.create({
      assetName: assetToDelete.title,
      assetStatus: "Deleted",
      assetId: id,
      creatorName: assetToDelete.creator._id,
      logDate: new Date().toString(),
    });

    assetToDelete.remove({ session });
    assetToDelete.creator.allAssets.pull(assetToDelete);

    await assetToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllAssets, getAssetDetail, createAsset, updateAsset, deleteAsset };
