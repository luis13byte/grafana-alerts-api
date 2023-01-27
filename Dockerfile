FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY src/ ./src/
COPY package*.json index.js ./

RUN npm ci --omit=dev

# Bundle app source
FROM gcr.io/distroless/nodejs:18 AS base

COPY --from=build /app /app

WORKDIR /app
EXPOSE 80
CMD ["index.js"]
