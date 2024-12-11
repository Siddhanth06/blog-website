import { Link } from 'react-router-dom';

const MainCategories = () => {
  return (
    <div className='hidden w-full bg-white md:flex justify-between items-center  rounded-2xl lg:rounded-3xl xl:rounded-full py-4 px-4'>
      {/* links */}
      <div className='flex flex-1 flex-wrap justify-start items-center gap-4 font-normal'>
        <Link to='/' className='bg-blue-800 text-white p-2 px-4 rounded-full'>
          All posts
        </Link>
        <Link to='/'>Web Design</Link>
        <Link to='/'>Development</Link>
        <Link to='/'>Databases</Link>
        <Link to='/'>Search Engines</Link>
        <Link to='/'>Marketing</Link>
      </div>
      {/* search */}
      <div>
        <input
          type='text'
          placeholder='🔍 Search'
          className='bg-gray-100 py-1 px-4 rounded-full'
        />
      </div>
    </div>
  );
};

export default MainCategories;
