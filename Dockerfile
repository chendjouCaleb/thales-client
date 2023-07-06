FROM node

COPY express-app /usr/app
WORKDIR /usr/app

EXPOSE 9200

CMD [ "node", "server.js" ]


