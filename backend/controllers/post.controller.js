import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

// Get all posts
export const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const query = {};

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: 'i' };
  }

  if (author) {
    const user = await User.findOne({ username: author }).select('_id');

    if (!user) {
      return res.status(400).json('no post found');
    }

    query.user = user._id;
  }

  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };

        break;
      case 'popular':
        sortObj = { visit: -1 };
        break;
      case 'trending':
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if (featured) {
    query.isFeatured = true;
  }

  try {
    const posts = await Post.find(query)
      .populate('user', 'username')
      .sort(sortObj)
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
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      'user',
      ['username', 'img']
    );
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//Create a new post
export const createPost = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
      res.status(401).json('not authenticated');
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      res.status(404).json('user not found');
    }

    let slug = req.body.title.replace(/\s+/g, '-').toLowerCase();

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

    if (!clerkUserId) {
      res.status(401).json('not authenticated');
    }

    const role = req.auth.sessionClaims?.metadata?.role || 'user';

    if (role === 'admin') {
      await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json('Post has been deleted');
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

//Feature post
export const featurePost = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
      res.status(401).json('not authenticated');
    }

    const role = req.auth.sessionClaims?.metadata?.role || 'user';

    if (role !== 'admin') {
      return res.status(403).json('Cannot feature post');
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json('post not found');
    }

    const isFeatured = post.isFeatured;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        isFeatured: !isFeatured,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const uploadAuth = async (req, res) => {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
};
