ARG NODE_VERSION=10.16.0

FROM node:${NODE_VERSION}-alpine AS builder

RUN apk add --no-cache util-linux

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
