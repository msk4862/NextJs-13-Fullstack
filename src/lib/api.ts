import { Prisma } from '@prisma/client';

type APIRequestBody =
  | Prisma.UserCreateInput
  | Prisma.UserWhereUniqueInput
  | Partial<Prisma.ProjectCreateInput>;

type FetcherParams = {
  url: string;
  method: 'POST' | 'GET';
  body?: APIRequestBody;
  json?: boolean;
};

export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: FetcherParams) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('API Error');
  }

  if (json) {
    return res.json();
  }
};

export const register = async (user: Prisma.UserCreateInput) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const signin = async (user: Prisma.UserWhereUniqueInput) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const signout = async () => {
  return fetcher({
    url: '/api/signout',
    method: 'POST',
    json: false,
  });
};

export const createNewProject = async (
  projectData: Partial<Prisma.ProjectCreateInput>
) => {
  return fetcher({
    url: 'api/project',
    method: 'POST',
    body: projectData,
  });
};
