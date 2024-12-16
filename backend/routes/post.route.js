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

//Get Single Post
router.get("/:slug", getPost);

//Create new post
router.post("/", createPost);

//Delete post
router.delete("/:id", deletePost);

export default router;
