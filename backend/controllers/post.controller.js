import Post from '../models/post.model.js';
import User from '../models/user.model.js';

// Get all posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
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
      res.status(401).json('not authenticated');
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      res.status(404).json('user not found');
    }

    let slug = req.body.title.replace('/ /g', '-').toLowerCase();

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
      res.status(401).json('not authenticated');
    }

    const user = await User.findOne({ clerkUserId });
    // Find and delete the post by slug
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    next(error);
  }
};
