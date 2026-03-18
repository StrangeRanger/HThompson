# ============================================
# Stage 1: Dependencies installation
# ============================================

ARG NODE_IMAGE='dhi.io/node:24'
ARG NODE_DEV_IMAGE='dhi.io/node:24-debian13-dev'

FROM ${NODE_DEV_IMAGE} AS dependencies
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  corepack enable \
  && pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build Next.js application in standalone moded
# ============================================

FROM ${NODE_DEV_IMAGE} AS builder
WORKDIR /app
ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,target=/app/.next/cache \
  corepack enable \
  && pnpm build \
  && pnpm prune --prod --ignore-scripts

# ============================================
# Stage 3: Run Next.js application
# ============================================

FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
