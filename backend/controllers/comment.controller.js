import Comment from '../models/comment.model.js';

export const getPostComments = async () => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('user', 'username img')
    .sort({ createdAt: -1 });

  res.json(comments);
};
export const addComment = async () => {};
export const deleteComment = async () => {};
