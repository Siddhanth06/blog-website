import Image from './Image';

const FeaturedPosts = () => {
  return (
    <>
      <div className='flex flex-col md:flex-row md:gap-8'>
        {/* main blog */}
        <div className=' flex flex-col gap-4 lg:w-1/2'>
          {/* image */}
          <div className='rounded-lg overflow-hidden'>
            <Image src='/featured4.jpeg' />
          </div>
          {/* tags */}
          <div className='flex gap-4'>
            <p className='font-bold'>01.</p>
            <p className='text-blue-800'>Web Design</p>
            <p className='text-gray-700'>2 days ago</p>
          </div>
          {/* description */}
          <div>
            <p className='font-bold md:text-xl md:w-full'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        {/* other blogs */}
        <div className='mt-4 flex flex-col gap-4 lg:gap-10 lg:w-1/2'>
          <div className='flex gap-4 items-start md:items-start text-[12px] md:text-base'>
            {/* image */}
            <div className='flex-[0.3] rounded-2xl overflow-hidden'>
              <Image src='/featured4.jpeg' className='object-contain' />
            </div>
            {/* content */}
            <div className='flex flex-1 flex-col gap-2'>
              <div className='flex gap-4'>
                <p className='font-bold'>01.</p>
                <p className='text-blue-800'>Web Design</p>
                <p className='text-gray-700'>2 days ago</p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Animi, neque?
                </p>
              </div>
            </div>
          </div>
          <div className='flex gap-4 items-center text-[12px] md:text-base'>
            {/* image */}
            <div className='flex-[0.3] rounded-2xl overflow-hidden'>
              <Image src='/featured4.jpeg' className='object-contain' />
            </div>
            {/* content */}
            <div className='flex flex-1 flex-col gap-2'>
              <div className='flex gap-4'>
                <p className='font-bold'>01.</p>
                <p className='text-blue-800'>Web Design</p>
                <p className='text-gray-700'>2 days ago</p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Animi, neque?
                </p>
              </div>
            </div>
          </div>
          <div className='flex gap-4 items-center text-[12px] md:text-base'>
            {/* image */}
            <div className='flex-[0.3] rounded-2xl overflow-hidden'>
              <Image src='/featured4.jpeg' className='object-contain' />
            </div>
            {/* content */}
            <div className='flex flex-1 flex-col gap-2'>
              <div className='flex gap-4'>
                <p className='font-bold'>01.</p>
                <p className='text-blue-800'>Web Design</p>
                <p className='text-gray-700'>2 days ago</p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Animi, neque?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedPosts;
