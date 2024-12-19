import Comment from './Comment';
import { useQuery } from '@tanstack/react-query';

// Function to fetch comments by ID
const fetchComments = async (postId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};
const Comments = ({ postId }) => {
  // Use useQuery to fetch the post by ID
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });

  // Handle loading, error, and success states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  // if (!data) return <div>Post not found</div>;
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
            <span className='bg-blue-800 text-white py-2 px-4 rounded-lg'>
              Send
            </span>
          </div>
        </div>
        {data?.map((comment) => {
          <Comment comment={comment} />;
        })}
        {/* <Comment /> */}
      </div>
    </>
  );
};

export default Comments;
