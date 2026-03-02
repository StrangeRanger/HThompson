# ============================================
# Stage 1: Dependencies installation
# ============================================

ARG NODE_VERSION=25-alpine

FROM node:${NODE_VERSION} AS dependencies
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  PNPM_VERSION=$(node -p "require('./package.json').packageManager") \
  && PNPM_VERSION=${PNPM_VERSION#pnpm@} \
  && npm install -g pnpm@"$PNPM_VERSION" \
  && pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build Next.js application in standalone moded
# ============================================

FROM node:${NODE_VERSION} AS builder
WORKDIR /app
ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,target=/app/.next/cache \
  PNPM_VERSION=$(node -p "require('./package.json').packageManager") \
  && PNPM_VERSION=${PNPM_VERSION#pnpm@} \
  && npm install -g pnpm@"$PNPM_VERSION" \
  && pnpm build \
  && pnpm prune --prod --ignore-scripts

# ============================================
# Stage 3: Run Next.js application
# ============================================

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
