import { Loader } from 'react-feather';

export default function ProjectLoader() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Loader className='animate-spin' size='50' />
    </div>
  );
}
