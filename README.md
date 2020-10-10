# server---typescript-course
### Stephen Grider's Express using typescript run through  

#### Why has this small section taken me so long?
- Had a *brief* run in with docker/podman and now my dev environment is within a container!
- I have also been learning markdown to produce better readme.md files!
- I have been playing with Stephen's javascript puzzles at <https://prep-app-prod.herokuapp.com/>
- I'n now the proud owner/admin of a dell R710 server! Old but gold.


#### In this section of the course we have used:
- more typescript type files
- express plug ins
- use of typescript decorators
- more enums within typescript

---

## To install:

---

**The rediculously easy way - in VSCode**
- Install the remote containers extension
- navigate to this folder, then

   ```
   code .
   ```
- open command palette and click reopen this folder in container

---

**To build the dev environment via CLI (even works on a different machine)**

- *the easy way:*
  ```
  chmod 755 docker-dev.sh
  sh ./docker-dev.sh
  ```
- *or the slightly harder way:*
  ```
  docker build -t dev-container .
  ```
- *attaching the **$PWD** as a volume mapped to **/app** & remove when finished*
  ```
  docker run -v $PWD/.:/app/.:z -p 3000:3000 --rm dev-
  ```

- Now launch vscode and install remote container extension, bring up the command palette and attach to running container to get access to the extensions.

--- 
**or run locally**  
- *install node*
  ```
  sudo apt install nodejs
  ```
- *or*
  ```
  sudo dnf install nodejs
  ```
- *then*
  ```
  npm install
  npm run start
  ```
