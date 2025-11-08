# Use Node 22 as base
FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# --- DEV target: kein Build, nur install + next dev --------------------------
FROM base AS dev
ENV NODE_ENV=development
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install
COPY . .
RUN pnpm prisma generate
EXPOSE 3000
# 0.0.0.0 = im Container nach außen erreichbar
CMD ["sh", "-c", "(pnpm prisma migrate deploy || (pnpm prisma db push --skip-generate --accept-data-loss && pnpm prisma migrate resolve --applied 20240214120000_init --applied 20240219100000_add_legacy_tables)) && pnpm prisma db seed && pnpm run dev -H 0.0.0.0 -p 3000"]

# --- PROD (wie gehabt) -------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && pnpm prisma generate && pnpm run build && pnpm prune --prod

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
RUN corepack enable && corepack prepare pnpm@latest --activate
EXPOSE 3000
CMD ["sh", "-c", "(pnpm prisma migrate deploy || (pnpm prisma db push --skip-generate --accept-data-loss && pnpm prisma migrate resolve --applied 20240214120000_init --applied 20240219100000_add_legacy_tables)) && pnpm prisma db seed && pnpm start"]
