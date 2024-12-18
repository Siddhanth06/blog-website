import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

// Get all posts
export const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  console.log(req.query.page);

  try {
    const posts = await Post.find()
      .populate("user", "username")
      .limit(limit)
      .skip((page - 1) * limit);

    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;
    res.status(200).json({ posts, hasMore });
  } catch (error) {
    next(error);
  }
};

//Get a single post
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//Create a new post
export const createPost = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.userId;
    console.log(req.auth.userId);

    if (!clerkUserId) {
      res.status(401).json("not authenticated");
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      res.status(404).json("user not found");
    }

    let slug = req.body.title.replace(/\s+/g, "-").toLowerCase();

    let existingPost = await Post.findOne({ slug });

    let counter = 0;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    const newPost = new Post({ user: user._id, slug, ...req.body });
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//Delete post
export const deletePost = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.userId;
    console.log(req.auth.userId);

    if (!clerkUserId) {
      res.status(401).json("not authenticated");
    }

    const user = await User.findOne({ clerkUserId });
    // Find and delete the post by slug
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    next(error);
  }
};

export const uploadAuth = async (req, res) => {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
};
