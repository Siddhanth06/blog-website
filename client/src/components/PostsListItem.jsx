import Image from './Image';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const PostsListItem = ({ post }) => {
  return (
    <div className='flex flex-col gap-4 lg:flex-row mb-8'>
      {/* <div> */}
      {/* image */}
      {post.img && (
        <Link
          to={post.slug}
          className='rounded-xl overflow-hidden md:hidden lg:flex lg:flex-[0.5] lg:flex-1'
        >
          <Image src={post.img} w='735' />
        </Link>
      )}
      {/* </div> */}
      <div className='flex flex-col gap-4 lg:flex-1'>
        {/* title */}
        <Link to={post.slug}>
          <h1 className='font-bold text-2xl'>{post.title}</h1>
        </Link>
        {/* tags */}
        <div className='flex gap-2 text-xs'>
          <span className='text-gray-500'>Written by</span>
          <span className='text-blue-900'>
            <Link to={`/posts?author=${post.user.username}`}>
              {post.user.username}
            </Link>
          </span>
          <span>on</span>
          <span className='text-blue-900'>{post.category}</span>
          <span className='text-gray-500'>{format(post.createdAt)}</span>
        </div>
        {/* description */}
        <div>
          <p>{post.desc}</p>
        </div>
        {/* read more */}
        <div>
          <a href='' className='underline'>
            <p>
              <Link to={post.slug}>Read more</Link>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostsListItem;
