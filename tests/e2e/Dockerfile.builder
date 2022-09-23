FROM node:16.17.0-alpine

RUN apk add --no-cache \
  bash \
  curl \
  yq \
  git

# create workspace
RUN mkdir -p \
  /app \
  /test-workspace \
  && chown -R node:node \
  /test-workspace \
  /app/ \
  # allow global npm installs from user node (don't do this for a prod image)
  /usr/local/lib/node_modules/ \
  /usr/local/bin/

USER node
WORKDIR /app

# copy deps spec
COPY --chown=node:node package.json pnpm-lock.yaml /app/

# install global version of pnpm through npm 
RUN PM=$(yq '.packageManager' package.json ) && npm i -g "$PM" 

RUN pnpm fetch

COPY --chown=node:node . /app/

RUN pnpm install --prefer-offline

RUN echo '' > "$HOME/.npmrc" \
  && echo 'registry=http://registry:48733/' >> "$HOME/.npmrc" \
  && echo '//registry:48733/:_authToken="T/ZceTDgZFqHEFyzQ5DE0A=="' >> "$HOME/.npmrc"

ENV IS_RUNNING_IN_TEST_CONTAINER=1