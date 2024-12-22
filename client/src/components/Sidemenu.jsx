import React from 'react';
import Search from '../components/Search';
import { Link, useSearchParams } from 'react-router-dom';

const Sidemenu = () => {
  const [searchParama, setSearchParams] = useSearchParams();
  function handleFilterChange(e) {
    console.log(e.target.value);

    if (searchParama.get('sort') !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParama.entries()),
        sort: e.target.value,
      });
    }
  }
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1>Search</h1>
        <Search />
      </div>
      <div className='flex flex-col gap-4'>
        <h1>Filters</h1>
        <div>
          <label htmlFor='' className='flex gap-2 items-center'>
            <input
              onChange={handleFilterChange}
              type='radio'
              name='sort'
              value='newest'
              id=''
              className='appearance-none w-4 h-4 border-[1.5px] bg-white rounded-sm checked:bg-blue-800'
            />
            Newest
          </label>
          <label htmlFor='' className='flex gap-2 items-center'>
            <input
              onChange={handleFilterChange}
              type='radio'
              name='sort'
              value='popular'
              id=''
              className='appearance-none w-4 h-4 border-[1.5px] bg-white rounded-sm checked:bg-blue-800'
            />
            Most popular
          </label>
          <label htmlFor='' className='flex gap-2 items-center'>
            <input
              onChange={handleFilterChange}
              type='radio'
              name='sort'
              value='trending'
              id=''
              className='appearance-none w-4 h-4 border-[1.5px] bg-white rounded-sm checked:bg-blue-800'
            />
            Trending
          </label>
          <label htmlFor='' className='flex gap-2 items-center'>
            <input
              onChange={handleFilterChange}
              type='radio'
              name='sort'
              value='oldest'
              id=''
              className='appearance-none w-4 h-4 border-[1.5px] bg-white rounded-sm checked:bg-blue-800'
            />
            oldest
          </label>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h1>Categories</h1>
        <div className='flex flex-col'>
          <Link to='/' className='underline'>
            All
          </Link>
          <Link to='/web-design' className='underline'>
            Web Design
          </Link>
          <Link to='/development' className='underline'>
            Development
          </Link>
          <Link to='/databases' className='underline'>
            Databases
          </Link>
          <Link to='/search-engines' className='underline'>
            Search Engines
          </Link>
          <Link to='/marketing' className='underline'>
            Marketing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
