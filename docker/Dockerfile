# build environment
FROM node:13.12.0-alpine as builder
WORKDIR /app

ARG REACT_APP_PB_ADMIN_USER
ENV REACT_APP_PB_ADMIN_USER=$REACT_APP_PB_ADMIN_USER

ARG REACT_APP_PB_ADMIN_PASSWORD
ENV REACT_APP_PB_ADMIN_PASSWORD=$REACT_APP_PB_ADMIN_PASSWORD

ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY ./ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]