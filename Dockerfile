FROM node:22-slim

RUN apt update
RUN apt-get install -y nginx-extras supervisor

ENV TZ Asia/Tokyo
RUN npm install -g pnpm

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf && rm /etc/nginx/sites-enabled/default
COPY confs/nginx.conf /etc/nginx/sites-enabled/
COPY confs/supervisor.conf /etc/supervisor/conf.d/

COPY . .
RUN npm run build

ENV BACKEND_HOST blog-backend:3000
VOLUME /app/static
EXPOSE 80 443

CMD ["/usr/bin/supervisord"]
