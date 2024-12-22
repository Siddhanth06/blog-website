import { Link } from 'react-router-dom';
import Image from '../components/Image';
import Search from '../components/Search';
import Comments from '../components/Comments';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PostMenuActions from '../components/PostMenuActions';

// Function to fetch a single post by ID
const fetchPost = async (slug) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};

const SinglePostPage = () => {
  const { slug } = useParams();

  // Use useQuery to fetch the post by ID
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });

  // Handle loading, error, and success states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Post not found</div>;

  const postId = data._id;

  // console.log('single post data', data);

  return (
    <div className='flex flex-col gap-4'>
      {/* detail */}
      <div className='flex flex-col lg:flex-row lg:gap-8'>
        <div className='flex flex-col gap-4 lg:w-3/5'>
          {/* content */}
          {/* title */}
          <div>
            <h1 className='font-bold text-lg md:text-xl lg:text-3xl'>
              {data.title}
            </h1>
          </div>
          {/* tags */}
          <div className='flex gap-2 text-xs'>
            <span className='text-gray-500'>Written by</span>
            <span className='text-blue-900'>{data.user.username}</span>
            <span>on</span>
            <span className='text-blue-900'>{data.category}</span>
            <span className='text-gray-500'>2 days ago</span>
          </div>
          {/* description */}
          <div>
            <p className='text-sm text-gray-600'>{data.desc}</p>
          </div>
        </div>
        {/* image */}
        <div className='hidden lg:block lg:w-2/5'>
          <Image src='/featured3.jpeg' className='rounded-3xl' />
        </div>
      </div>
      {/* content */}
      <div className='flex flex-col md:flex-row md:gap-16 md:justify-between'>
        <div
          className='md:flex-1'
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
        <div className='md:flex-[0.25] md:flex md:flex-col md:gap-4 sticky top-8'>
          <div className='flex flex-col gap-4'>
            <h1 className='font-medium'>Author</h1>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-4'>
                {/* <p>{data.user.img}</p> */}
                <img
                  src={data.user.img}
                  alt=''
                  width='40'
                  className='rounded-full'
                />
                <span>{data?.user?.username}</span>
              </div>
              <p className='text-sm'>Lorem ipsum dolor sit amet conse</p>
              <div className='flex gap-2'>
                <Image src='instagram.svg' />
                <Image src='facebook.svg' />
              </div>
            </div>
          </div>
          <PostMenuActions post={data} />
          <div className='flex flex-col gap-4'>
            <h1 className='font-medium'>Categories</h1>
            <div className='flex flex-col gap-2'>
              <Link className='underline'>All</Link>
              <Link className='underline'>Web Design</Link>
              <Link className='underline'>Development</Link>
              <Link className='underline'>Databases</Link>
              <Link className='underline'>Search Engines</Link>
              <Link className='underline'>Marketing</Link>
            </div>
          </div>
          <h1>Search</h1>
          <Search />
        </div>
      </div>
      {/* comments */}
      <Comments postId={postId} />
    </div>
  );
};

export default SinglePostPage;
