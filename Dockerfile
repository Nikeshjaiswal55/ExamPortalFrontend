FROM node:16-alpine AS builder
FROM nginx:1.23-alpine

# Create app directory
WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy project files
COPY /dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]