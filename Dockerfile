# ---- Build ----
FROM node:25-alpine AS build
WORKDIR /app
ENV CI=true

COPY package.json pnpm-lock.yaml ./
RUN PNPM_VERSION=$(node -p "require('./package.json').packageManager") \
  && PNPM_VERSION=${PNPM_VERSION#pnpm@} \
  && npm install -g pnpm@"$PNPM_VERSION" \
  && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---- Runtime ----
FROM node:25-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
