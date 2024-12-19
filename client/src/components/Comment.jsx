import React from "react";
import Image from "./Image";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
  console.log(comment);

  return (
    <div className='flex flex-col gap-4 lg:w-3/5'>
      <div className='flex items-center gap-4'>
        <Image src='/featured4.jpeg' w='40' h='40' className='rounded-full' />
        <h1>{comment.user.username}</h1>
        <p>{format(comment.createdAt)}</p>
      </div>
      <div className=''>
        <p className='bg-white py-2 px-4 rounded-md'>{comment?.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
