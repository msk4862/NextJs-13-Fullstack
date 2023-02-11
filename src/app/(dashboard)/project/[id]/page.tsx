import { cookies } from 'next/headers';

import { TaskCard } from '@components/TaskCard';
import { getUserFromCookie } from '@lib/auth';
import { db } from '@lib/db';
import { delay } from '@lib/utils';

type ProjectPage = {
  // default props for a page
  params: {
    id: string;
  };
};

const getProjectData = async (projectId: string) => {
  await delay(3000);
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id: projectId, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({ params }: ProjectPage) {
  const project = await getProjectData(params.id);

  if (!project) {
    return null;
  }

  return (
    <div className='h-full overflow-y-auto pr-6 w-1/1'>
      {/* @ts-expect-error */}
      <TaskCard tasks={project.tasks} title={`Tasks for ${project.name}`} />
    </div>
  );
}
