import { SignUp } from '@clerk/clerk-react';

const RegisterPage = () => {
  return (
    <div className='flex justify-center h-[calc(100vh - 80px)] items-center'>
      <SignUp signInUrl='/login' />
    </div>
  );
};

export default RegisterPage;
