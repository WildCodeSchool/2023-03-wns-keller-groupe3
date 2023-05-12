FROM node:lts-alpine

WORKDIR /app

COPY public ./
COPY src ./
COPY package.json ./

RUN npm install

COPY package-lock.json ./
COPY tsconfig.json ./

CMD npm start