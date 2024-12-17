import React from "react";
import Image from "./Image";

const Comment = () => {
  return (
    <div className='flex flex-col gap-4 lg:w-3/5'>
      <div className='flex items-center gap-4'>
        <Image src='/featured4.jpeg' w='40' h='40' className='rounded-full' />
        <h1>John Doe</h1>
        <p>2 days ago</p>
      </div>
      <div className=''>
        <p className='bg-white py-2 px-4 rounded-md'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihil cupiditate ut
          eveniet saepe expedita odit voluptatem, similique culpa magnam!
        </p>
      </div>
    </div>
  );
};

export default Comment;
