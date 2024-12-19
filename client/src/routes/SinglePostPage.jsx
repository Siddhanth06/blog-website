import { Link } from "react-router-dom";
import Image from "../components/Image";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Function to fetch a single post by ID
const fetchPost = async (slug) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};

const SinglePostPage = () => {
  const { slug } = useParams();

  // Use useQuery to fetch the post by ID
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });

  // Handle loading, error, and success states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Post not found</div>;

  const postId = data._id;
  console.log(postId);

  // console.log('single post data', data);

  return (
    <div className='flex flex-col gap-4'>
      {/* detail */}
      <div className='flex flex-col lg:flex-row lg:gap-8'>
        <div className='flex flex-col gap-4 lg:w-3/5'>
          {/* content */}
          {/* title */}
          <div>
            <h1 className='font-bold text-lg md:text-xl lg:text-3xl'>{data.title}</h1>
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
        <div className='md:flex-1' dangerouslySetInnerHTML={{ __html: data.content }}></div>
        <div className='md:flex-[0.25] md:flex md:flex-col md:gap-4 sticky top-8'>
          <div className='flex flex-col gap-4'>
            <h1 className='font-medium'>Author</h1>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-4'>
                {/* <p>{data.user.img}</p> */}
                <img src={data.user.img} alt='' width='40' className='rounded-full' />
                <span>{data?.user?.username}</span>
              </div>
              <p className='text-sm'>Lorem ipsum dolor sit amet conse</p>
              <div className='flex gap-2'>
                <Image src='instagram.svg' />
                <Image src='facebook.svg' />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='font-medium'>Actions</h1>
            <div className='flex items-center gap-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 48 48'
                width='20px'
                height='20px'
              >
                <path
                  d='M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z'
                  stroke='black'
                  strokeWidth='2'
                  fill='none'
                />
              </svg>
              <span>Save this Post</span>
            </div>
            <div className='flex items-center gap-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 50 50'
                fill='red'
                width='20px'
                height='20px'
              >
                <path d='M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z' />
              </svg>
              <span>Delete this Post</span>
            </div>
          </div>
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
