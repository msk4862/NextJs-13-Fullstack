import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { getUserFromCookie } from '@lib/auth';
import { db } from '@lib/db';
import { delay } from '@lib/utils';
import { Task, TASK_STATUS } from '@prisma/client';
import { cookies } from 'next/headers';

type TaskCardProps = {
  tasks?: Task[];
  title: string;
};

const getCardData = async () => {
  await delay(5000);

  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: { due: 'asc' },
  });

  return tasks;
};

export const TaskCard = async ({ tasks, title }: TaskCardProps) => {
  const data = tasks || (await getCardData());

  return (
    <Card>
      <div className='flex justify-between items-center'>
        <div>
          <span className='text-3xl text-gray-600'>{title}</span>
        </div>
        <div>
          <Button variant='text' className='text-violet-600'>
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div key={task.id} className='py-2 '>
                <div>
                  <span className='text-gray-800'>{task.name}</span>
                </div>
                <div>
                  <span className='text-gray-400 text-sm'>
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};
