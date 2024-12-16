import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

const authenticator = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const { getToken } = useAuth();
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      console.log("token", token);

      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      category: formData.get("category"),
      content: value,
    };

    console.log(data);
    mutation.mutate(data);
  };

  const onError = (err) => {
    console.log(err);
    toast.error("Image upload failed !!");
  };

  const onSuccess = (res) => {
    console.log(res);
    setCover(res);
  };

  const onUploadProgress = (progress) => {
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>You should login first</div>;
  }
  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit} action='' className='flex flex-col flex-1 gap-6'>
        {/* <button className='bg-white w-max p-2 rounded-lg text-gray-800'>Add a cover image</button> */}
        <IKContext
          publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          authenticator={authenticator}
        >
          <IKUpload
            fileName='test-upload.png'
            onError={onError}
            onSuccess={onSuccess}
            onUploadProgress={onUploadProgress}
          />
        </IKContext>
        <input
          type='text'
          name='title'
          id=''
          placeholder='My Awesome Story'
          className='w-max font-bold text-3xl bg-transparent'
        />
        <div className='flex gap-2 items-center'>
          <label htmlFor=''>Choose a category:</label>
          <select name='category' id='' className='p-1 rounded-lg'>
            <option value='General'>General</option>
            <option value='Development'>Development</option>
            <option value='Web Design'>Web Design</option>
            <option value='Search Engines'>Search Engines</option>
            <option value='Databases'>Databases</option>
            <option value='Marketing'>Marketing</option>
          </select>
        </div>
        <textarea
          name='desc'
          id=''
          className='text-gray-700 px-4 py-2 rounded-lg'
          placeholder='A Short Description'
        ></textarea>
        <ReactQuill
          theme='snow'
          className='flex-1 bg-white rounded-lg'
          value={value}
          onChange={setValue}
        />
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className='bg-blue-800 text-white w-max py-2 px-4 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed'
        >
          Send
        </button>
        {"Progress:" + progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
