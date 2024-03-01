FROM node:20-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# RUN npm install --save node-addon-api node-gyp
RUN npm install sharp
RUN npm install -g --arch=x64 --os=linux --libc=musl sharp


# If using npm comment out above and use below instead
ENV NEXT_SHARP_PATH /app/node_modules/sharp
RUN npm run build

ENV NODE_ENV production



RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER root

COPY --chown=nextjs:nodejs ./public/ .next/standalone/public/
RUN cp -r .next/static .next/standalone/.next/static && chown -R nextjs:nodejs .next/standalone/.next/static


EXPOSE 3000

ENV PORT 3000

CMD ["node", "/app/.next/standalone/server.js"]