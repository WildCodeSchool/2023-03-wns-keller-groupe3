FROM node:lts-alpine

WORKDIR /app

COPY public public
COPY src src
COPY package.json package.json

RUN npm install

COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

CMD npm start