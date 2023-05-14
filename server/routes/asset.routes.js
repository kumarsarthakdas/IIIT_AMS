import express from "express";

import {
  createAsset,
  deleteAsset,
  getAllAssets,
  getAssetDetail,
  updateAsset,
} from "../controllers/asset.controller.js";

const router = express.Router();

router.route("/").get(getAllAssets);
router.route("/:id").get(getAssetDetail);
router.route("/").post(createAsset);
router.route("/:id").patch(updateAsset);
router.route("/:id").delete(deleteAsset);

export default router;
