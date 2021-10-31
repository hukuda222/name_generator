FROM node:16.8.0

EXPOSE 3000

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
WORKDIR /usr/src/app
