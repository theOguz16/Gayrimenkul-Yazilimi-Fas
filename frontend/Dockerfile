# Base image
FROM node:18 as build

# Set working directory in the frontend folder
WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the frontend folder
COPY . .

# Build the application
RUN npm run build

# Serve the app with Nginx (if serving via Nginx, adjust for your use case)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 5173

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
