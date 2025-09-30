FROM node:22-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
ENV NODE_ENV=production
COPY . .
RUN npm run build:web
ENV NODE_ENV=production
RUN npm run build:web

FROM nginx:alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
