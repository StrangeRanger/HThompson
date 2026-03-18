# ============================================
# Stage 1: Dependencies installation
# ============================================

ARG NODE_VERSION_TAG=24@sha256:139b06c52d868b294ef96af34093c579c4b634d940c5cba582bdbaa1863c62a5
ARG NODE_DEV_VERSION_TAG=24-debian13-dev@sha256:45fe5233ee11a08247af47a901f43880496e39d93cb1bbc55235f9b50883476f

FROM dhi.io/node:${NODE_DEV_VERSION_TAG} AS dependencies
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  corepack enable \
  && pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build Next.js application in standalone moded
# ============================================

FROM dhi.io/node:${NODE_DEV_VERSION_TAG} AS builder
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

FROM dhi.io/node:${NODE_VERSION_TAG} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
