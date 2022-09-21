FROM node:alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@pikas-template/app --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-*.yaml .
COPY .npmrc .
RUN corepack enable
RUN pnpm install -r --no-frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=@pikas-template/app...

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/app/next.config.js .
COPY --from=installer /app/apps/app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/.next/static ./apps/app/.next/static

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

CMD node apps/app/server.js
