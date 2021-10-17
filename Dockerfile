FROM node:14-slim as base 

RUN apt-get update && apt-get install -y git

RUN yarn install -g \
  verdaccio \
  verdaccio-auth-memory \
  verdaccio-memory \
  npm-auth-to-token

RUN mkdir /application/ \
  && chown node:node /application/

USER node
WORKDIR /application/

ADD --chown=node:node . /application/
RUN --mount=type=cache,id=pnpm-store,uid=1000,gid=1000,target=/home/node/.pnpm-store \
  pnpm install 

# RUN pnpm build





