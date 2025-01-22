FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY .env.example ./.env

RUN pnpm build


FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

# Expose the port
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]