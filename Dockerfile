FROM node:lts-alpine

RUN yarn global add serverless

WORKDIR /home/ubuntu

EXPOSE 3000

CMD tail -f /dev/null