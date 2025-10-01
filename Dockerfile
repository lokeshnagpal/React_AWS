# Step 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /LD_AWS

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Step 2: Run the Next.js app in production
FROM node:18-alpine AS runner

WORKDIR /LD_AWS

# Copy only the build output and required files
COPY --from=builder /LD_AWS/package*.json ./
COPY --from=builder /LD_AWS/.next ./.next
COPY --from=builder /LD_AWS/public ./public
COPY --from=builder /LD_AWS/node_modules ./node_modules
COPY --from=builder /LD_AWS/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]
