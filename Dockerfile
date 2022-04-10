ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine

RUN apk add --no-cache \
  jq \
  bash \
  curl \
  git

RUN mkdir /app \
  && chown -R node:node /app

ARG PNPM_VERSION
RUN npm i -g pnpm@$PNPM_VERSION

# for creating verdaccio test user
RUN npm i -g npm-auth-to-token

USER node
WORKDIR /app
COPY --chown=node:node pnpm-lock.yaml /app

RUN pnpm fetch

COPY --chown=node:node . /app

RUN pnpm install --offline