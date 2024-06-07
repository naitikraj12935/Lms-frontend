# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /LMS

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Define the command to run the application
CMD ["npm", "run", "dev"]
