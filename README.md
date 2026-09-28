# Job Application Tracker

A web app for tracking job applications: which company, which position, where you found the ad, and how far the process has gone.

## Features 

- Add an application with company, position, job URL, source, location, salary and notes
- Move an application through statuses: Applied, Interview, Offer, Rejected, Withdrawn
- Delete an application
- Applications are listed newest first

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [PostgreSQL](https://www.postgresql.org)
- [Prisma 7](https://www.prisma.io)

### Requirements

- Node.js 20 or newer
- A running PostgreSQL Server

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your own database credentials:

```bash
cp .env.example .env
```
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE"
```

### 3. Create the database schema

```bash
npx prisma migrate dev
```
This applies the migrations from `prisma/migrations` and generates the Prisma client.

### 4. Start the development server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm start` - run the production build
- `npm run lint` - Run ESLint
- `npx prisma studio` - Browse and edit the database in the browser

## Project structure 

```
app/
  actions.ts    Server actions: create, update status, delete
  page.tsx      Application list and the form
lib/
  prisma.ts     Prisma client instance
prisma/
  schema.prisma  Database schema
  migrations/   Migration history
```

## Roadmap

- Edit an existing application
- Filter applications by status
- Follow-up reminders
- Import job ads from public GitHub hiring repositories
