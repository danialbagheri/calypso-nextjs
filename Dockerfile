FROM node:20 AS base
WORKDIR /app

# Install dependencies based on package manager
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; elif [ -f yarn.lock ]; then yarn --frozen-lockfile; elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; else echo "Lockfile not found." && exit 1; fi

# Build the Next.js application
COPY . .
RUN npm run build

# Production-optimized Docker image
FROM nginx:latest AS runner
WORKDIR /app

# Copy built Next.js app
COPY --from=base --chown=nginx:nginx /app/public ./public
COPY --from=base --chown=nginx:nginx /app/.next ./next

# Set security permissions (adjust as needed)

# Expose port and start server
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

