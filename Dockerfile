ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}
RUN apt-get update
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get -y install --no-install-recommends\
    ca-certificates \
    git\
    bzip2\
    zsh\
    curl\
    htop\
    libfontconfig

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

RUN npm install yarn --no-package-lock\
    && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

CMD ["concurrently", "yarn:start:run", "yarn:start:build"]
