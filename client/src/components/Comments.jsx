import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

// Function to fetch comments by ID
const fetchComments = async (postId) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
  return response.data; // Correctly returning data from axios response
};

const Comments = ({ postId }) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // Use useQuery to fetch the comments by postId
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId, // Ensure the query is enabled only when postId exists
  });

  // Post comment mutation
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      console.log("under mutation fn", newComment);

      const token = await getToken();
      console.log(token);

      return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      console.log("success", res);
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      desc: formData.get("desc"),
    };

    console.log(data); // Log the form data

    mutation.mutate(data);
  };

  // Handle loading, error, and success states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className='flex flex-col gap-8'>
        <div>
          <h1 className='text-gray-500 text-2xl'>Comments</h1>
          <div className='flex items-center justify-between gap-8 lg:w-3/5'>
            <form action='' onSubmit={handleSubmit}>
              <textarea
                name='desc'
                className='w-full rounded-lg py-2 px-4 mt-4'
                placeholder='Write a comment...'
              />
              <button type='submit' className='bg-blue-800 text-white py-2 px-4 rounded-lg'>
                Send
              </button>
            </form>
          </div>
        </div>
        {/* Render Comments */}
        {data?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default Comments;
