import { useInfiniteQuery } from "@tanstack/react-query";
import PostsListItem from "./PostsListItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const PostsList = () => {
  const fetchPosts = async (pageParam) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: { page: pageParam, limit: 2 },
    });
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length + 1 : undefined),
    });

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  if (isFetching) return "Loading...";

  if (status === "error") return "Something went wrong";
  return (
    <>
      <InfiniteScroll
        dataLength={allPosts.length} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts...</h4>}
        endMessage={
          <p>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {allPosts.map((post) => {
          return <PostsListItem key={post._id} post={post} />;
        })}
      </InfiniteScroll>
    </>
  );
};

export default PostsList;
