import React from "react";
import Comment from "./Comment";

const Comments = () => {
  return (
    <>
      <div className='flex flex-col gap-8'>
        <div>
          <h1 className='text-gray-500 text-2xl'>Comments</h1>
          <div className='flex items-center justify-between gap-8 lg:w-3/5'>
            <textarea
              name=''
              id=''
              className='w-full rounded-lg py-2 px-4 mt-4'
              placeholder='Write a comment...'
            ></textarea>
            <span className='bg-blue-800 text-white py-2 px-4 rounded-lg'>Send</span>
          </div>
        </div>
        <Comment />
        <Comment />
      </div>
    </>
  );
};

export default Comments;
