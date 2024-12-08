import Image from './Image';

const PostsList = () => {
  return (
    <div className='flex flex-col gap-4'>
      {/* image */}
      <div className='rounded-xl overflow-hidden md:hidden'>
        <Image src='/featured3.jpeg' />
      </div>
      {/* title */}
      <div>
        <h1 className='font-bold text-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, facilis.
        </h1>
      </div>
      {/* tags */}
      <div className='flex gap-2 text-xs'>
        <span className='text-gray-500'>Written by</span>
        <span className='text-blue-900'>John Doe</span>
        <span>on</span>
        <span className='text-blue-900'>Web Design</span>
        <span className='text-gray-500'>2 days ago</span>
      </div>
      {/* description */}
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cum eius
          iusto ex id voluptatem!
        </p>
      </div>
      {/* read more */}
      <div>
        <a href='' className='underline'>
          <p>read more</p>
        </a>
      </div>
    </div>
  );
};

export default PostsList;
