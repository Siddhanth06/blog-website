import React from 'react';
import Image from './Image';
import { format } from 'timeago.js';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const Comment = ({ comment, postId }) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();

      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment deleted successfully !!');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className='flex flex-col gap-4 lg:w-3/5'>
      <div className='flex items-center gap-4'>
        <img src={comment.user.img} width={40} className='rounded-full' />
        <h1>{comment.user.username}</h1>
        <p>{format(comment.createdAt)}</p>
        {user && comment.user.username && role == 'admin' && (
          <p
            className='text-xs text-red-600 cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        )}
      </div>
      <div className=''>
        <p className='bg-white py-2 px-4 rounded-md'>{comment?.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
