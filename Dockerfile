FROM node:15-alpine as builder

COPY package.json package-lock.json ./

RUN npm install --silent && mkdir /app-ui && mv ./node_modules ./app-ui

WORKDIR /app-ui

COPY . .

RUN npm run ng build -- --base-href=/ --deploy-url=/ --prod


FROM nginx:alpine

#!/bin/sh

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app-ui/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
