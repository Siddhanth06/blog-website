import Post from "../models/post.model.js";

// Get all posts
export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

//Get a single post
export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(200).json(post);
};

//Create a new post
export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  const post = await newPost.save();
  res.status(200).json(post);
};

//Delete post
export const deletePost = async (req, res) => {
  try {
    // Find and delete the post by slug
    const deletedPost = await Post.findOneAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};
