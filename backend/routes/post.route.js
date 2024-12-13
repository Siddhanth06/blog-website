import express from "express";
import { createPost, deletePost, getPost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

//Get All Posts
router.get("/", getPosts);

//Get Single Post
router.get("/:slug", getPost);

//Create new post
router.post("/", createPost);

//Delete post
router.delete("/:id", deletePost);

export default router;
