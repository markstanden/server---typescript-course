FROM node:14-stretch
RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends

EXPOSE 80

WORKDIR /app

COPY package*.json ./

RUN npm install yarn \
    && npm cache clean --force

RUN yarn install

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

CMD ["concurrently", "yarn:start:*"]