This can be an example for people who are trying to develop a full-stack application using NextJs v13 with `app` directory.

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

Start development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
