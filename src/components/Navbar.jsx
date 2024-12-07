import { useState } from 'react';
import Image from './Image';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
      {/* logo */}
      <div className='flex items-center gap-4 text-2xl font-bold'>
        <Image src='logo.png' w={32} h={32} alt='logo image' />
        <span>Siddhanth</span>
      </div>
      {/* mobile menu */}
      <div className='md:hidden'>
        {/* mobile menu button */}
        <div
          onClick={() => setOpen((prev) => !prev)}
          className='cursor-pointer text-2xl'
        >
          {open ? 'close' : 'open'}
        </div>
        {/* Mobile menu list */}
        <div
          className={`h-screen w-full flex flex-col text-lg gap-8 font-medium justify-center items-center absolute top-16 bg-[#e6e6ff] transition-all ease-in-out ${
            open ? '-right-[0%]' : '-right-[100%]'
          }`}
        >
          <a href='/'>Home</a>
          <a href='/'>Trending</a>
          <a href='/'>Popular</a>
          <a href='/'>About</a>
          <a href='/'>
            <button className='px-4 py-2 bg-blue-800 rounded-3xl text-white'>
              Login 👋
            </button>
          </a>
        </div>
      </div>
      {/* desktop menu */}
      <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
        <a href='/'>Home</a>
        <a href='/'>Trending</a>
        <a href='/'>Popular</a>
        <a href='/'>About</a>
        <a href='/'>
          <button className='px-4 py-2 bg-blue-800 rounded-3xl text-white'>
            Login 👋
          </button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
