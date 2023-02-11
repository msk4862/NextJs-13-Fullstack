import { TaskCard } from '@components/TaskCard';
import { getProjectData } from '@lib/server_side_data_fetching/project_data';

type ProjectPage = {
  // default props for a page
  params: {
    id: string;
  };
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
