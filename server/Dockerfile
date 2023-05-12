FROM node:lts-alpine

# Pour Argon
# RUN apk add make g++ python3 git
# RUN npm i -g node-pre-gyp

WORKDIR /app

COPY src ./
COPY package.json ./

RUN npm install

COPY package-lock.json ./
COPY tsconfig.json ./

CMD npm start