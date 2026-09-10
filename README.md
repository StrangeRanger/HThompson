# HThompson

[![Project Tracker](https://img.shields.io/badge/repo%20status-Project%20Tracker-lightgrey)](https://hthompson.dev/project-tracker#project-611022081)

Personal website and service hub for [hthompson.dev](https://hthompson.dev), built with Next.js and Material UI.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/) and [MUI X Data Grid](https://mui.com/x/react-data-grid/)
- [Emotion](https://emotion.sh/)
- [Matomo](https://matomo.org/)

## Features

- Responsive personal hub and navigation shell
- Project Tracker with hourly cached GitHub repo/gist data
- About, Links, and Policies pages
- Security-focused headers and CSP setup
- Standalone output for containerized deployment

## Routes

- `/` - Home
- `/project-tracker` - Project Tracker
- `/about` - About
- `/links` - Social links
- `/policies` - Web policies

## Requirements

- Node.js `>=24.0.0`
- pnpm

## Getting Started

```bash
git clone https://github.com/StrangeRanger/HThompson.git
cd HThompson
pnpm install
pnpm dev
```

Local URL: `http://localhost:3000`

## Scripts

```bash
pnpm dev               # Start dev server
pnpm build             # Production build
pnpm start             # Start production server
pnpm build:standalone  # Build standalone output
pnpm start:standalone  # Run standalone output
pnpm lint              # Lint
pnpm lint:fix          # Lint + auto-fix
pnpm test              # Project Tracker cache regression tests
pnpm format            # Format code
```

## Deployment

- Includes a multi-stage `Dockerfile`
- Includes a hardened `docker-compose.yml` example
- CI workflows run lint/build and Docker publishing

### Project Tracker cache

The browser loads `/api/project-tracker`. The server fetches public GitHub
repositories, gists, and their latest commits without an authentication token,
then shares the result across visitors for one hour. The first request after
expiry refreshes the cache; simultaneous requests share that refresh. No GitHub
requests run while the page is unused.

Failed refreshes preserve the last successful data and wait an hour before
retrying. If no successful data is available yet, the endpoint returns `503`
with a `Retry-After` header. Empty repositories still appear with an unknown
commit date.

The cache lives in memory in each server process and clears on restart. The
single-container deployment needs no database or writable cache directory.
Multiple server instances would each maintain their own cache. With 31 repos
and 13 gists, a full refresh makes about 46 GitHub requests; more projects,
server restarts, or other GitHub traffic from the same IP can still reach the
unauthenticated rate limit.

## License

This project is licensed under the [MIT License](LICENSE).
