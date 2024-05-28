FROM node:20-slim

ENV TZ Asia/Tokyo
RUN npm install -g pnpm

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN npm run build

ENV UPSTREAM_HOST blog-backend

EXPOSE 8000

CMD ["npm", "run", "serve"]
