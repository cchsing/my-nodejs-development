# Use an official, lightweight Node.js runtime as the base image
FROM node:26-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install application dependencies
RUN npm install --production

# Copy the rest of your application code (including index.js)
COPY . .

# Expose the port your app listens on (change 3000 if your app uses a different port)
# EXPOSE 3000

# Define the command to run your app
CMD [ "node", "index.js" ]
