import { useQuery } from "@tanstack/react-query";
import PostsListItem from "./PostsListItem";
import axios from "axios";

const PostsList = () => {
  const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
    return res.data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetchPosts(),
  });

  console.log(data);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      {data.map((index, item) => {
        return <PostsListItem key={item._id} data={item} />;
      })}
    </>
  );
};

export default PostsList;
