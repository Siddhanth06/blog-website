import express from "express";
import Post from "../models/post.model.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send("Working");
});

export default router;
