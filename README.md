# Projectory

### Discover What Builders Create.

A full-stack launch and discovery platform where makers submit products, the
community surfaces promising work through votes, and moderators curate what
goes live.

[Explore the architecture](#architecture) |
[Run locally](#getting-started) |
[View the roadmap](#roadmap)

Projectory is under active development with core discovery, submission, voting, authentication, and moderation workflows already implemented.

## Overview

Projectory gives independent developers, startup teams, and creative builders a
focused place to launch apps, AI tools, SaaS products, courses, and other
projects.

The platform combines a public discovery experience with an authenticated maker
workflow and a lightweight moderation queue:

1. Visitors browse approved products and open dedicated product pages.
2. Signed-in makers submit a project from a validated form.
3. New submissions enter a pending moderation queue.
4. Administrators approve or reject submissions.
5. Approved products appear in ranked, searchable, and recent-launch views.

Unlike a static showcase directory, Projectory already includes the operational
pieces needed to run a curated launch community: identity, organization
ownership, moderation state, server-side mutations, database migrations, and
cache-aware rendering.

## Why Projectory?

Most projects never get discovered.

Developers, founders, students, and makers spend weeks building products that often receive little visibility, feedback, or recognition.

Projectory exists to help builders launch their work, gain community validation, and reach people who care about what they're creating.

## Highlights

- Community-driven project discovery
- Authentication with Clerk
- Admin moderation workflow
- Product launch and approval system
- Voting and ranking engine
- Built with Next.js 16, React 19, Drizzle, Neon, and PostgreSQL

## Engineering Highlights

- Next.js 16 App Router
- React Server Components
- Server Actions
- Clerk Authentication & Organizations
- PostgreSQL + Drizzle ORM
- Zod Validation
- Partial Prerendering
- Cache Components

## Tech stack

| Layer          | Technology                                                                     |
| -------------- | ------------------------------------------------------------------------------ |
| Frontend       | Next.js 16 App Router, React 19, TypeScript                                    |
| Styling        | Tailwind CSS 4, shadcn, Radix UI, Lucide icons                                 |
| Server         | React Server Components, Server Actions, Next.js Proxy                         |
| Database       | PostgreSQL on Neon                                                             |
| ORM            | Drizzle ORM and Drizzle Kit                                                    |
| Authentication | Clerk users and organizations                                                  |
| Validation     | Zod                                                                            |
| Rendering      | Cache Components, Suspense, partial prerendering                               |
| Deployment     | Next.js-compatible hosting; Vercel and Neon are the natural production pairing |

## Screenshots 
will be added after deployment.

## Features

### Discovery

- Ranked product feed ordered by community vote count
- Featured-product treatment for high-signal launches
- Recently launched products calculated from the last seven days
- Client-side product search
- Trending and date-based sorting
- Dedicated, shareable product pages by unique slug
- Product tags, launch metadata, maker attribution, and outbound website links

### Maker workflow

- Clerk-powered sign-up, sign-in, user profile, and organization switching
- Automatic organization creation for newly authenticated users
- Authenticated product submissions associated with both a Clerk user and
  organization
- Server-side Zod validation with field-level feedback
- Pending-by-default submissions to keep the public catalog curated

### Community voting

- Authenticated upvote and downvote server actions
- Optimistic vote-count updates for immediate interface feedback
- Atomic PostgreSQL vote increments and decrements
- Database-level protection against negative aggregate vote counts

### Moderation

- Admin access controlled by Clerk public metadata
- Dashboard totals for pending, approved, rejected, and all products
- Review cards with submitter, date, tags, status, and destination link
- Approve and reject actions with approval timestamps

### Interface and developer experience

- Responsive App Router interface built with React Server Components
- Tailwind CSS design tokens with light and dark palettes
- Reusable shadcn/Radix-style UI primitives
- Suspense loading states and product skeletons
- Next.js Cache Components and partial prerendering
- TypeScript strict mode, ESLint, Drizzle migrations, and seed data


## Architecture

```mermaid
flowchart LR
    V["Visitor"] --> UI["Next.js App Router UI"]
    M["Authenticated maker"] --> CLERK["Clerk authentication and organizations"]
    A["Administrator"] --> CLERK
    CLERK --> PROXY["Next.js proxy"]
    PROXY --> UI
    UI --> SC["React Server Components"]
    UI --> SA["Server Actions"]
    SC --> ORM["Drizzle ORM"]
    SA --> VALIDATION["Zod validation"]
    VALIDATION --> ORM
    ORM --> DB[("Neon PostgreSQL")]
    SA --> CACHE["Path revalidation"]
    CACHE --> UI
```

The public catalog is read through server-side Drizzle queries. Mutations use
Server Actions, so credentials and database access remain on the server.
Clerk supplies user and organization context; the database stores the
corresponding IDs with each submission. Administrators are authorized from
Clerk user metadata before the moderation dashboard is rendered.

### Data model

The current schema centers on a `products` table containing:

- Product identity: name, unique slug, tagline, and description
- Discovery metadata: website URL, JSON tags, vote count, and timestamps
- Moderation state: `pending`, `approved`, or `rejected`
- Ownership: submitter email, Clerk user ID, and Clerk organization ID
- Indexes for unique slugs, moderation status, and organization lookups

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm
- A PostgreSQL database, such as [Neon](https://neon.tech/)
- A [Clerk](https://clerk.com/) application with Organizations enabled

### 1. Clone and install

```bash
git clone https://github.com/Ashwanikr2728/projectory.git
cd projectory
npm install
```

### 2. Configure the environment

Create `.env` in the project root:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

Do not commit `.env`. Environment files are already ignored by Git.

In Clerk:

1. Enable Organizations.
2. Configure `/sign-in` and `/sign-up` as the authentication routes if your
   instance does not infer them automatically.
3. To grant moderation access, set `publicMetadata.isAdmin` to `true` on the
   relevant Clerk user.

The proxy automatically creates an organization for an authenticated user who
does not yet belong to one.

### 3. Apply the database migration

```bash
npx drizzle-kit migrate
```

To generate a new migration after changing `db/schema.ts`:

```bash
npx drizzle-kit generate
```

### 4. Optionally load demo products

```bash
npm run seed
```

> [!WARNING]
> The seed script clears the existing `products` table before inserting demo
> records. Use it only against a disposable development database.

### 5. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Quality checks

```bash
npm run lint
npm run build
```

### Production

```bash
npm run build
npm run start
```

Set the same environment variables in your hosting provider and apply database
migrations before serving production traffic. The build requires network access
to fetch the configured Outfit font from Google Fonts.

## Project structure

```text
.
|-- app/
|   |-- admin/             # Protected moderation dashboard
|   |-- explore/           # Searchable and sortable catalog
|   |-- products/[slug]/   # Product detail routes
|   |-- sign-in/           # Clerk authentication screen
|   |-- sign-up/           # Clerk registration screen
|   `-- submit/            # Authenticated submission workflow
|-- components/
|   |-- admin/             # Moderation cards, actions, and statistics
|   |-- common/            # Header, footer, section headers, empty states
|   |-- forms/             # Reusable validated form fields
|   |-- landing-page/      # Hero and product feed sections
|   |-- products/          # Cards, explorer, form, skeleton, voting
|   `-- ui/                # Shared interface primitives
|-- db/
|   |-- schema.ts          # Drizzle PostgreSQL schema
|   |-- index.ts           # Neon/Drizzle connection
|   |-- seed.ts            # Development seed runner
|   `-- data.ts            # Demo catalog
|-- drizzle/               # Versioned SQL migrations and metadata
|-- lib/
|   |-- admin/             # Moderation Server Actions
|   `-- products/          # Queries, validation, and product Server Actions
|-- types/                 # Shared inferred application types
|-- proxy.ts               # Clerk context and organization provisioning
`-- next.config.ts         # Next.js Cache Components configuration
```

## Key workflows

### Submit a product

1. A maker signs in through Clerk.
2. The proxy ensures the maker has an organization.
3. The submission Server Action validates all fields with Zod.
4. The product is stored with `pending` status and Clerk ownership IDs.
5. The maker receives structured success or validation feedback.

### Moderate a launch

1. The admin route verifies the Clerk session.
2. It reads `publicMetadata.isAdmin` from the current Clerk user.
3. Authorized admins review the pending queue.
4. Approval publishes the product and records `approvedAt`; rejection keeps it
   out of public queries.

### Discover and support products

1. Public queries return approved products ordered by votes.
2. Visitors search or sort the catalog in the browser.
3. Product detail pages expose descriptions, tags, launch dates, and external
   links.
4. Signed-in organization members can vote through atomic server-side updates.

## Security

Implemented protections include:

- Server-side authentication checks for submissions and voting
- Organization membership requirements for write operations
- Admin route authorization through Clerk metadata
- Server-only database credentials and mutations
- Zod validation before product insertion
- Parameterized Drizzle queries
- Unique database index for product slugs
- `noopener noreferrer` on external links
- Vote counters clamped at zero in PostgreSQL
- Environment files excluded from version control

Before a public production launch, the project should also add:

- A normalized vote table with a unique user/product constraint
- Authorization checks inside every admin Server Action, not only the page
- URL protocol validation and output sanitization rules
- Rate limiting and abuse controls for submissions and voting
- Database constraints or enums for moderation status
- Audit logging, monitoring, automated tests, and a documented secret-rotation
  process

## Performance

- Cache Components are enabled in `next.config.ts`.
- Cached product queries support 15-minute revalidation in the production
  build.
- Partial prerendering combines static shells with streamed dynamic content.
- React Server Components keep database reads and most rendering off the client.
- Suspense boundaries provide progressive loading for recent launches and
  authentication-dependent interface elements.
- Search and sorting use memoized in-browser computation after the approved
  catalog is loaded.
- Database indexes support slug, status, and organization query patterns.
- Vote changes use atomic SQL updates instead of read-modify-write round trips.


  ## Vision

Projectory aims to become the go-to platform where developers, founders, students, and makers launch projects, gain visibility, receive feedback, and build credibility within a global builder community.

## Roadmap

- [ ] Add one-vote-per-user persistence and toggleable vote state
- [ ] Enforce authorization inside moderation mutations
- [ ] Connect product deletion with confirmation and audit history
- [ ] Add product editing and maker-owned dashboards
- [ ] Introduce category and tag filters with paginated server queries
- [ ] Replace static hero metrics with verified platform analytics
- [ ] Add image/logo uploads and social preview metadata
- [ ] Add rate limiting, moderation notes, and abuse reporting
- [ ] Add unit, integration, and Playwright end-to-end coverage
- [ ] Add CI for linting, type checks, builds, and migration validation
- [ ] Add observability, structured logging, and error tracking

## Current maturity

Projectory is a functional full-stack MVP and a strong foundation for a
production launch community. The repository passes ESLint and completes a
production Next.js build.

The most important current limitations are:

- Votes are aggregate counters; individual voter records and duplicate-vote
  prevention are not implemented yet.
- Admin Server Actions rely on the protected admin page and need their own
  defense-in-depth authorization checks.
- The visible delete control is not connected to a delete action.
- Homepage community metrics are static marketing copy, not database-backed
  analytics.
- Automated unit, integration, and end-to-end tests are not present.
- The repository has a minimal Git history and no CI, issue templates, or
  release workflow yet.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a focused branch:

   ```bash
   git checkout -b feat/short-description
   ```

3. Make the change and include tests when the project gains a test harness.
4. Run the existing quality checks:

   ```bash
   npm run lint
   npm run build
   ```

5. Commit with a clear message and open a pull request describing the problem,
   approach, and verification performed.

Please keep pull requests scoped, avoid committing secrets or generated build
output, and include a migration when changing the database schema.

## License

All Rights Reserved.
