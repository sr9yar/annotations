FROM node:22-alpine

WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

EXPOSE 4200

ENTRYPOINT [ "ng" ]
