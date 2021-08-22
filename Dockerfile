FROM node:lts-alpine

RUN yarn global add serverless

RUN yarn global add ts-node

WORKDIR /home/ubuntu

EXPOSE 3000

CMD tail -f /dev/null