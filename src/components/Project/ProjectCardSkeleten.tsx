import { Card } from '@components/Card';

export const ProjectCardSkeleten = () => {
  return (
    <Card className='!px-6 !py-8'>
      <div className='animate-pulse transition-colors'>
        <div className='h-2 w-20 rounded bg-gray-300'></div>
        <div className='h-10 w-full rounded bg-gray-300 mt-2 mb-6'></div>
        <div className='h-2 w-full rounded bg-gray-300 mt-2'></div>
        <div className='h-2 w-20 rounded bg-gray-300 mt-2'></div>
        <div className='h-2 w-full rounded bg-gray-300 mt-2'></div>
      </div>
    </Card>
  );
};
