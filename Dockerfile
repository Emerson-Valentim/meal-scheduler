FROM node:lts-alpine

RUN npm install -g serverless

WORKDIR /home/ubuntu

EXPOSE 3000

CMD tail -f /dev/null