# ============================================
# Stage 1: Dependencies installation
# ============================================

FROM dhi.io/node:24-debian13-dev AS dependencies
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  corepack enable \
  && pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build Next.js application in standalone moded
# ============================================

FROM dhi.io/node:24-debian13-dev AS builder
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

FROM dhi.io/node:24 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
