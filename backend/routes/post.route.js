import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  uploadAuth,
} from "../controllers/post.controller.js";

const router = express.Router();

//Image upload authentication
router.get("/upload-auth", uploadAuth);

//Get All Posts
router.get("/", getPosts);

//Delete post
router.delete("/:id", deletePost);

//Get Single Post
router.get("/:slug", getPost);

//Create new post
router.post("/", createPost);

export default router;
