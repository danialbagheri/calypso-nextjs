FROM node:20-slim AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends python3 g++ \
    gconf-service libxext6 libxfixes3 libxi6 libxrandr2 \
    libxrender1 libcairo2 libcups2 libdbus-1-3 libexpat1 \
    libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 \
    libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 \
    libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
    libxdamage1 libxss1 libxtst6 libappindicator1 libnss3 libasound2 \
    libatk1.0-0 libc6 libdrm-dev libgbm-dev ca-certificates fonts-liberation lsb-release xdg-utils wget \
    # Chromium for running Turbopack benchmarks
    chromium \
    # Used for plotters graph visualizations in turbopack benchmarks
    libfontconfig1-dev
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

RUN npm install --save node-addon-api node-gyp
RUN npm install sharp
RUN npm install -g --arch=x64 --os=linux --libc=glibc sharp


# If using npm comment out above and use below instead
ENV NEXT_SHARP_PATH /app/node_modules/sharp
RUN npm run build

ENV NODE_ENV production



RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER root

RUN chown -R nextjs:nodejs /app/
RUN chown nextjs:nodejs /app/.next/standalone
RUN chown nextjs:nodejs /app/.next/static
COPY .next/standalone ./



EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]