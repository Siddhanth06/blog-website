import { useState } from "react";
import PostsList from "../components/PostsList";
import Sidemenu from "../components/Sidemenu";
const PostListPage = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className=''>
        <h1 className='text-2xl text-gray-500'>Development Blog</h1>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='bg-blue-800 py-2 px-4 text-white rounded-lg mt-8 md:hidden'
        >
          Filter or Search
        </button>
        <div className='flex flex-col-reverse  md:flex-row gap-8 mt-8'>
          <div className='flex flex-col gap-4'>
            <PostsList />
          </div>
          <div className={open ? "hidden md:block" : "block md:block"}>
            <Sidemenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostListPage;
