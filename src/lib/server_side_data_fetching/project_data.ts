import { cookies } from 'next/headers';
import { getUserFromCookie } from '../auth';
import { db } from '../db';
import { delay } from '../utils';

export const getProjectData = async (projectId: string) => {
  // simulating different load time of different project data
  await delay(Math.random() * 2000);

  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id: projectId, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

export const getProjectIds = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: { ownerId: user?.id },
    select: { id: true },
  });

  return projects;
};
