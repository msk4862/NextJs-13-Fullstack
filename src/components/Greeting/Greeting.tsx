import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Logout } from './Logout';
import { getUserDetails } from '@lib/server_side_data_fetching/user_data';

export const Greeting = async () => {
  const user = await getUserDetails();

  return (
    <Card className='w-full py-4 flex flex justify-between'>
      <div className='mb-2'>
        <h1 className='text-3xl text-gray-700 font-bold mb-4'>
          Hello, {user?.firstName}!
        </h1>
        <h4 className='text-xl text-gray-400'>
          Check your daily tasks and schedule
        </h4>
        <div className='mt-4'>
          <Button size='lg'>Today&apos;s Schedule</Button>
        </div>
      </div>
      <div>
        <Logout />
      </div>
    </Card>
  );
};
