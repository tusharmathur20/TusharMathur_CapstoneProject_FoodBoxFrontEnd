# FROM node:latest as builder

# RUN mkdir -p /app

# WORKDIR /app

# COPY . .

# RUN npm install
# RUN npm run build

# CMD ["npm","start"]

FROM nginx:1.17.1-alpine
COPY /dist/FoodBoxFront /usr/share/nginx/html

