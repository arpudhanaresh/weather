# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code into the container
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the React app with a web server (Nginx)
FROM nginx:alpine

# Copy the build output from the first stage to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow access to the app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
