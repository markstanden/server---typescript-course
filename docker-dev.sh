#!/bin/bash
# A startup script for the development container:
# Don't forget to set it as executable first:
# > chmod 755 docker-dev.sh

echo Building the container 'dev-container'
docker build -t dev-container .

echo running the container and
echo attaching the $PWD as a volume mapped to /app
echo remove when finished
docker run -v $PWD/.:/app/.:z -p 127.0.0.1:3000:3000 --rm dev-container
