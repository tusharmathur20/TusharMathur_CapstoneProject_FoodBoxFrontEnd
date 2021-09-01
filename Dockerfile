FROM node:latest as builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install -g npm@7.21.1
RUN npm run build --prod

CMD ["npm","start"]

