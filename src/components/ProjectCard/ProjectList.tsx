import { Loader } from 'react-feather';
import { Suspense } from 'react';
import Link from 'next/link';

import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleten } from './ProjectCardSkeleten';
import { getProjectIds } from '@lib/server_side_data_fetching/project_data';

export const ProjectList = async () => {
  const projectIds = await getProjectIds();

  return projectIds.map(({ id }) => {
    return (
      <div key={id} className='p-3'>
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
    <div className='w-full h-full flex justify-center col-span-full mt-5'>
      <Loader size='40' className='animate-spin duration-1000' />
    </div>
  );
};
