# HThompson

[![Project Tracker](https://img.shields.io/badge/repo%20status-Project%20Tracker-lightgrey)](https://hthompson.dev/project-tracker#project-611022081)

Personal website and service hub for [hthompson.dev](https://hthompson.dev), built with Next.js and Material UI.

> [!NOTE]
> Status: **Beta**
>
> This version is functionally complete, with a few additional small changes planned before it is considered final.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/) and [MUI X Data Grid](https://mui.com/x/react-data-grid/)
- [Emotion](https://emotion.sh/)
- [Matomo](https://matomo.org/)

## Features

- Responsive personal hub and navigation shell
- Project Tracker with live GitHub repo/gist data
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
pnpm format            # Format code
```

## Deployment

- Includes a multi-stage `Dockerfile`
- Includes a hardened `docker-compose.yml` example
- CI workflows run lint/build and Docker publishing

## License

This project is licensed under the [MIT License](LICENSE).
