import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useUser } from "@clerk/clerk-react";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>You should login first</div>;
  }
  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1>Create a new post</h1>
      <form action='' className='flex flex-col flex-1 gap-6'>
        <button className='bg-white w-max p-2 rounded-lg text-gray-800'>Add a cover image</button>
        <input
          type='text'
          name=''
          id=''
          placeholder='My Awesome Story'
          className='w-max font-bold text-3xl bg-transparent'
        />
        <div className='flex gap-2 items-center'>
          <label htmlFor=''>Choose a category:</label>
          <select name='cat' id='' className='p-1 rounded-lg'>
            <option value=''>General</option>
            <option value=''>General</option>
            <option value=''>General</option>
            <option value=''>General</option>
            <option value=''>General</option>
          </select>
        </div>
        <textarea name='desc' id='' className='text-gray-700 px-4 py-2 rounded-lg'>
          A Short Description
        </textarea>
        <ReactQuill theme='snow' className='flex-1 bg-white rounded-lg' />
        <button className='bg-blue-800 text-white w-max py-2 px-4 rounded-lg'>Send</button>
      </form>
    </div>
  );
};

export default Write;
