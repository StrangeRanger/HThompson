# ---- Build ----
FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV CI=true

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && pnpm prune --prod --ignore-scripts

# ---- Runtime ----
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chmod=0555 /app/.output ./output
COPY --from=build --chmod=0555 /app/node_modules ./node_modules

USER node
EXPOSE 3000
CMD ["node", "output/server/index.mjs"]
