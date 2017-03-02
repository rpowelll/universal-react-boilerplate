FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Build the app
RUN npm run-script build

# Start the server
EXPOSE 3000
CMD [ "npm", "run-script", "start:production" ]