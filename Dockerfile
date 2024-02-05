
# FROM node:16-alpine AS builder
# FROM nginx:1.23-alpine

# # Create app directory
# WORKDIR /app

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy project files
# COPY /dist /usr/share/nginx/html

# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Base image
FROM node:18-alpine

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package*.json /react-app

RUN npm install

# Copying all the files in our project
COPY . .

# Exposing the port
EXPOSE 3003

# Starting our application
CMD [ "npm", "run", "start" ]