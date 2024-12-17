import { useQuery } from "@tanstack/react-query";
import PostsListItem from "./PostsListItem";
import axios from "axios";

const PostsList = () => {
  const fetchPosts = async (pageParam) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: { page: pageParam },
    });
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    });

  if (isFetching) return "Loading...";

  if (status === "error") return "Something went wrong";
  return (
    <>
      {data.map((index, item) => {
        return <PostsListItem key={item._id} data={item} />;
      })}
    </>
  );
};

export default PostsList;
