An example full-stack application using **NextJs v13** with [app](https://beta.nextjs.org/docs) *(beta)* directory.

A web app for tracking different projects and its tasks. 🚧 WIP...

Auth Page             |  Home Page
:-------------------------:|:-------------------------:
![Auth page](https://user-images.githubusercontent.com/24875366/218306646-0702f9e7-70c0-4280-bb1a-9cfc648bf2e3.png)  |  ![Home Page](https://user-images.githubusercontent.com/24875366/218311501-ca8b0d32-a27a-48a7-8f41-d6b8f948fc04.png)



### Tech used:
- [NextJs](https://beta.nextjs.org/docs)
- [PostgreSQL](https://www.postgresql.org/) database
- [Prisma](https://www.prisma.io/) ORM 
- [Tailwind CSS](https://tailwindcss.com/)


## Getting Started
> Create .env file and add environment variables (see .env.example for reference)

### Databse setup

DB migration:
```bash
npx prisma migrate dev 
```

Seed DB with test data (optional):
```bash
npx prisma db seed
```

### Start development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/*](http://localhost:3000/api/*). These endpoints can be edited in `pages/api/*.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
