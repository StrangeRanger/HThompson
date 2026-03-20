# ============================================
# Stage 1: Dependencies installation
# ============================================

ARG NODE_VERSION_TAG=24@sha256:b6ca209fcbaebaa905c0245c20787eeeb7ccfd1418fbdaf8a505af15bffc39c8
ARG NODE_DEV_VERSION_TAG=24-debian13-dev@sha256:1ad99a6e6c7052c72c18668ff92c9073b5c69c3e7d8a42e766deeda13c2b1cc8

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

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
