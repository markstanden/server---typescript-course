# FROM node:14-stretch
# RUN apt-get update -qq && apt-get install -qy \
#    ca-certificates \
#    bzip2 \
#    curl \
#    libfontconfig \
#    --no-install-recommends

# FROM registry.fedoraproject.org/fedora:rawhide    
# RUN dnf update --assumeyes
# RUN dnf upgrade --assumeyes
# RUN dnf install --assumeyes nodejs
# RUN dnf install --assumeyes\
#    ca-certificates\
#    bzip2\
#    curl

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

RUN npm install yarn \
    && npm cache clean --force
RUN rm package-lock.json

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

CMD ["concurrently", "yarn:start:run", "yarn:start:build"]
