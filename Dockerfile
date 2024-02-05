# # Base image
# FROM node:18-alpine

# # Declaring env
# ENV NODE_ENV development

# # Setting up the work directory
# WORKDIR /react-app

# # Installing dependencies
# COPY ./package.json /react-app

# COPY ./package-lock.json /react-app

# RUN npm install --force

# # Copying all the files in our project
# COPY . .

# # Exposing the port
# EXPOSE 3000
# EXPOSE 5173

# # Starting our application
# CMD [ "npm", "run", "dev" ]

# # Base image with Node.js for building the React app
FROM node:16-alpine AS builder
FROM nginx:1.23-alpine

# Create app directory
WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install --force
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy project files
COPY /dist /usr/share/nginx/html

# Build the React app
# RUN npm run build
# Base image for Nginx

# Copy the built React app to the Nginx document root
# COPY --from=builder /app/dist 

# Copy Nginx configuration file

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]