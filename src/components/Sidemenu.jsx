import React from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";

const Sidemenu = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1>Search</h1>
        <Search />
      </div>
      <div className='flex flex-col gap-4'>
        <h1>Filters</h1>
        <div>
          <label htmlFor='' className='flex gap-2'>
            <input type='radio' name='sort' value='newest' id='' />
            Newest
          </label>
          <label htmlFor='' className='flex gap-2'>
            <input type='radio' name='sort' value='popular' id='' />
            Most popular
          </label>
          <label htmlFor='' className='flex gap-2'>
            <input type='radio' name='sort' value='trending' id='' />
            Trending
          </label>
          <label htmlFor='' className='flex gap-2'>
            <input type='radio' name='sort' value='object' id='' />
            Object
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
