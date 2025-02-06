FROM node:23.6.0 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx serves on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
