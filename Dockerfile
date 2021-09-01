FROM node:latest as builder

# RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

# CMD ["npm","start"]

FROM nginx:alpine
COPY --from=node app/dist/FoodBoxFront /usr/share/nginx/html

