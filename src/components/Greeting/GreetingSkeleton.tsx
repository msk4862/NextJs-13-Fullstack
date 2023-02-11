import { Card } from '@components/Card';

export const GreetingsSkeleton = () => {
  return (
    <Card className='w-full py-8'>
      <div className='animate-pulse flex flex-col gap-2'>
        <div className='bg-gray-300 h-6 w-40'></div>
        <div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-gray-300 rounded col-span-2'></div>
            <div className='h-2 bg-gray-300 rounded col-span-1'></div>
          </div>
        </div>
        <div className='rounded bg-gray-300 h-2 w-full'></div>
        <div className='rounded bg-gray-300 h-2 w-full'></div>
        <div className='rounded bg-gray-300 h-8 w-40 mt-1'></div>
      </div>
    </Card>
  );
};
