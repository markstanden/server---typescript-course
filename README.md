# server---typescript-course
Stephen Grider's Express using typescript run through

now with docker devcontainer!

So to build the dev environment:

'''
*the easy way:*
chmod 755 docker-dev.sh
sh ./docker-dev.sh

*or the slightly harder way:*
docker build -t dev-container .
*attaching the $PWD as a volume mapped to /app & remove when finished*
docker run -v $PWD/.:/app/.:z -p 3000:3000 --rm dev-container

*or run locally*
*install node*
sudo apt install nodejs or sudo dnf install nodejs etc...
npm install
npm run start
```

If using the dev container, launch vscode and install remote container extension, bring up the command palette and attach to running container to get access to the extensions.