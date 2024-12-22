import { useQuery } from '@tanstack/react-query';
import Image from './Image';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

const fetchPost = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};
const FeaturedPosts = () => {
  // Use useQuery to fetch the post by ID
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: () => fetchPost(),
  });

  const posts = data?.posts;
  console.log(posts);

  // Handle loading, error, and success states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Post not found</div>;
  return (
    <>
      <div className='flex flex-col md:flex-row md:gap-8'>
        {/* main blog */}
        <Link to={`${posts[0].slug}`} className='flex flex-col gap-4 md:w-1/2'>
          <div className='flex flex-col gap-4'>
            {/* image */}
            <div className='rounded-lg overflow-hidden'>
              {posts[0].img && <Image src={`${posts[0].img}`} w='735' />}
            </div>
            {/* tags */}
            <div className='flex gap-4'>
              <p className='font-bold'>01.</p>
              <p className='text-blue-800'>{posts[0].category}</p>
              <p className='text-gray-700'>{format(posts[0].createdAt)}</p>
            </div>
            {/* description */}
            <div>
              <p className='font-bold md:text-xl md:w-full'>{posts[0].desc}</p>
            </div>
          </div>
        </Link>
        {/* other blogs */}
        <div className='mt-4 lg:h-1/3 flex flex-col gap-4 lg:gap-10 md:w-1/2'>
          <Link to={`${posts[1].slug}`}>
            <div className='flex gap-4 items-start md:items-start text-[12px] md:text-base'>
              {/* image */}
              <div className='flex-[0.3] rounded-2xl overflow-hidden'>
                {posts[1].img && (
                  <Image src={posts[1].img} className='object-contain' />
                )}
              </div>
              {/* content */}
              <div className='flex flex-1 flex-col gap-2'>
                <div className='flex gap-4'>
                  <p className='font-bold'>02.</p>
                  <p className='text-blue-800'>{posts[1].category}</p>
                  <p className='text-gray-700'>{format(posts[1].createdAt)}</p>
                </div>
                <div>
                  <p>{posts[1].desc}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to={`${posts[2].slug}`}>
            <div className='flex gap-4 items-start md:items-start text-[12px] md:text-base'>
              {/* image */}
              <div className='flex-[0.3] rounded-2xl overflow-hidden'>
                {posts[2].img && (
                  <Image src={posts[2].img} className='object-contain' />
                )}
              </div>
              {/* content */}
              <div className='flex flex-1 flex-col gap-2'>
                <div className='flex gap-4'>
                  <p className='font-bold'>03.</p>
                  <p className='text-blue-800'>{posts[2].category}</p>
                  <p className='text-gray-700'>{format(posts[2].createdAt)}</p>
                </div>
                <div>
                  <p>{posts[2].desc}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to={`${posts[3].slug}`}>
            <div className='flex gap-4 items-start md:items-start text-[12px] md:text-base'>
              {/* image */}
              <div className='flex-[0.3] rounded-2xl overflow-hidden'>
                {posts[3].img && (
                  <Image src={posts[3].img} className='object-contain' />
                )}
              </div>
              {/* content */}
              <div className='flex flex-1 flex-col gap-2'>
                <div className='flex gap-4'>
                  <p className='font-bold'>04.</p>
                  <p className='text-blue-800'>{posts[3].category}</p>
                  <p className='text-gray-700'>{format(posts[3].createdAt)}</p>
                </div>
                <div>
                  <p>{posts[3].desc}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FeaturedPosts;
