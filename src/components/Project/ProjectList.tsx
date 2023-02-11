import { Loader } from 'react-feather';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { getUserFromCookie } from '@lib/auth';
import { db } from '@lib/db';
import { delay } from '@lib/utils';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleten } from './ProjectCardSkeleten';

const getProjectIds = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: { ownerId: user?.id },
    select: { id: true },
  });

  return projects;
};

export const ProjectList = async () => {
  const projectIds = await getProjectIds();

  return projectIds.map(({ id }) => {
    return (
      <div key={id} className='w-1/3 p-3'>
        <Link href={`project/${id}`}>
          <Suspense fallback={<ProjectCardSkeleten />}>
            {/* @ts-expect-error */}
            <ProjectCard projectId={id} />
          </Suspense>
        </Link>
      </div>
    );
  });
};

export const ProjectListLoader = () => {
  return (
    <div className='w-full h-full flex justify-center mt-5'>
      <Loader size='40' className='animate-spin duration-1000' />
    </div>
  );
};
