import { Link } from 'react-router-dom';
import Search from './Search';

const MainCategories = () => {
  return (
    <div className='hidden w-full bg-white md:flex justify-between items-center  rounded-2xl lg:rounded-3xl xl:rounded-full py-4 px-4'>
      {/* links */}
      <div className='flex flex-1 flex-wrap justify-start items-center gap-4 font-normal'>
        <Link to='/' className='bg-blue-800 text-white p-2 px-4 rounded-full'>
          All posts
        </Link>
        <Link to={`/posts?cat=web-design`}>Web Design</Link>
        <Link to={`/posts?cat=development`}>Development</Link>
        <Link to={`/posts?cat=databases`}>Databases</Link>
        <Link to={`/posts?cat=search-engines`}>Search Engines</Link>
        <Link to={`/posts?cat=marketing`}>Marketing</Link>
      </div>
      {/* search */}
      <div>
        {/* <input
          type='text'
          placeholder='🔍 Search'
          className='bg-gray-100 py-1 px-4 rounded-full'
        /> */}
        <Search />
      </div>
    </div>
  );
};

export default MainCategories;
