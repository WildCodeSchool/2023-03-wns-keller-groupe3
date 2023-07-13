FROM node:lts-alpine

WORKDIR /app

COPY public public
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY src src

COPY tsconfig.json tsconfig.json
COPY tailwind.config.js tailwind.config.js

CMD npm start