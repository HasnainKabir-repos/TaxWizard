FROM node:20 AS server

WORKDIR /app

COPY server/package*.json ./
RUN npm install
COPY server/ ./

FROM node:20 AS client

WORKDIR /client/app

COPY client/package*.json ./
RUN npm install
COPY client/ ./

FROM node:14

# Set the working directory for the application
WORKDIR /usr/src/app

# Copy server-side code from the 'server' stage
COPY --from=server /usr/src/app/server ./

# Copy client-side build from the 'client' stage
COPY --from=client /usr/src/app/client/build ./client

# Expose the port for the server
EXPOSE 8080

# Command to start the server
CMD [ "node", "server.js" ]
