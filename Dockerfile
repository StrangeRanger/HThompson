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
RUN pnpm build && pnpm prune --prod --ignore-scripts

# ---- Runtime ----
FROM node:25-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chmod=0555 /app/.output ./output
COPY --from=build --chmod=0555 /app/node_modules ./node_modules

USER node
EXPOSE 3000
CMD ["node", "output/server/index.mjs"]
