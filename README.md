# HThompson

[![Project Tracker](https://img.shields.io/badge/repo%20status-Project%20Tracker-lightgrey)](https://hthompson.dev/project-tracker#project-611022081)

Personal website and service hub for [hthompson.dev](https://hthompson.dev), built with Next.js and Material UI.

> [!NOTE]
> This project, particularly the Project Tracker, was developed with AI assistance. It was not entirely programmed by AI.

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
- Configurable HTTP 418 honeypot for scanner probe paths
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
pnpm test              # Project Tracker and honeypot regression tests
pnpm format            # Format code
```

## Deployment

- Includes a multi-stage `Dockerfile`
- Includes a hardened `docker-compose.yml` example
- CI workflows run lint/build and Docker publishing

## Honeypot

Requests to configured honeypot paths receive an HTTP `418` response. Tools such as Fail2Ban can detect that status in access logs and ban the requesting IP address. The application itself does not track or ban IP addresses.

Edit `honeypotConfig` in [`app/lib/honeypot.ts`](app/lib/honeypot.ts) to change the paths or set `enabled: false`, then rebuild/redeploy. Use `exactPaths` for individual paths and `directoryPaths` for directories and their descendants. Only add paths the application does not serve; paths excluded by `config.matcher` in `proxy.ts` will not reach the honeypot.

## License

This project is licensed under the [MIT License](LICENSE).
