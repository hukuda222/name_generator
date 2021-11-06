FROM node:16.8.0

EXPOSE 3000

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim","mecab","libmecab-dev","mecab-ipadic-utf8"]
WORKDIR /usr/src/app
