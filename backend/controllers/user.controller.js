import User from "../models/user.model.js";

export const getUserSavedPost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not Authenticated");
  }

  const user = await User.findOne({ clerkUserId });

  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  console.log("inside savePost");

  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;
  console.log("savePost", postId);

  console.log("clerkid postid", clerkUserId, postId);

  if (!clerkUserId) {
    return res.status(401).json("Not Authenticated");
  }

  const user = await User.findOne({ clerkUserId });
  console.log("user", user);

  const isSaved = user.savedPosts.some((p) => p === postId);
  console.log("isSaved", isSaved);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};