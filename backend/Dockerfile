FROM node:20 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY .env.example ./.env

RUN pnpm db:generate

RUN pnpm db:push

RUN pnpm build


FROM node:20-alpine AS runtime

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001

CMD ["node", "dist/main.js"]