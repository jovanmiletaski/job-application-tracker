# Job Application Tracker

A web app for tracking job applications: which company, which position, where you found the ad, and how far the process has gone.

## Features

- Add an application with company, position, job URL, source, location, salary and notes
- Move an application through statuses: Applied, Interview, Offer, Rejected, Withdrawn
- Delete an application
- Applications are listed newest first
- Browse job listings imported from public job feeds, and turn any listing into an
  application with one click
- Listings already applied to are marked, so the same job is never added twice

## Job sources

Listings are imported from public, key-free endpoints. Each source is one entry in
[`lib/sources.ts`](lib/sources.ts):

| Source | What it is | Notes |
| --- | --- | --- |
| [Simplify](https://github.com/SimplifyJobs/New-Grad-Positions) | Aggregator publishing new-grad and internship listings as JSON in public GitHub repositories | Contains historical entries, so only active listings from the last 7 days are imported |
| [Greenhouse](https://developers.greenhouse.io/job-board.html) | Applicant tracking system; each company's job board exposes its open roles as JSON | First-party data, open roles only |

Adding a source means adding one entry to `SOURCES` and one function in
[`lib/feed.ts`](lib/feed.ts) that maps the response to the shared `Listing` type.
Nothing else changes.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [PostgreSQL](https://www.postgresql.org)
- [Prisma 7](https://www.prisma.io)

## Getting Started

### Requirements

- Node.js 20 or newer
- A running PostgreSQL server

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
Open [http://localhost:3000](http://localhost:3000), then go to **Browse job listings**
and click **Refresh Listings** to import the first batch of job ads.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm start` - Run the production build
- `npm run lint` - Run ESLint
- `npx prisma studio` - Browse and edit the database in the browser

## Project structure

```
app/
  actions.ts          Server Actions: create, update status, delete, sync, apply
  page.tsx            Application list and the form
  listings/
    page.tsx          Imported job listings
lib/
  prisma.ts           Prisma client instance
  sources.ts          The list of job sources
  feed.ts             Fetches each source and maps it to the Listing type
prisma/
  schema.prisma       Database schema
  migrations/         Migration history
```

## Roadmap

- Edit an existing application
- Filter and paginate listings by category and location
- Filter applications by status
- Follow-up reminders
- More job sources (Lever boards, Arbeitnow)
