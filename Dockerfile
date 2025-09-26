## Build a minimal production image for a Node.js app with pnpm.
FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV CI=true
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install
COPY . .
RUN pnpm build && pnpm prune --prod --ignore-scripts

## Production image, copy all the files and run the app.
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./output
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./
USER node
EXPOSE 3000
CMD ["node", "output/server/index.mjs"]
