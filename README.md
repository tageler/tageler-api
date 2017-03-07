Tageler API
===========
Preconditions
---
- Install NodeJS
- Install and run MongoDB
- Alternatively: Use [docker](https://github.com/tageler/tageler-docker)

Quickstart
----------
```bash
git clone https://github.com/tageler/tageler-api.git
cd tageler-api
npm install
gulp
```
Configuration
-------------

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_PORT_27017_TCP_ADDR | MongoDB hostname, the ip/host this points to needs to run MongoDB on port 27017 | `localhost` |
| MONGODB_DATABASE_NAME | Name of MongoDB database to use for tageler | `tageler` |

Websites
-------------

| Website | Description | Technology |Honour to|
|:---|:---|:---|:---|
|[a successful git branching model](http://nvie.com/posts/a-successful-git-branching-model/)|the git paradigm we stay close to|GIT|ESE & Peschmae|
|[Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)|Talk to API's over a chrome-plugin|*GET* / *POST*| Artthik |
|[Tutorial: Create a REST API](http://techforgeek.com/2015/01/create-rest-api-using-node-js-mongoose-restify/)|Create REST API using Node.js, mongoose and restify|NodeJS, restify, Mongoose| Artthik |
|[Learn Angular](https://angular.io/docs/ts/latest/guide/learning-angular.html)|From *setting-up* over *user-input* to *template-syntax*|Angular|Kevin|
|[Angular 2.0](http://thejackalofjavascript.com/developing-a-mean-app-with-angular-2-0/)|Developing a MEAN app with Angular 2.0|Angular 2.0|Ramona|
Glossary
--------
| Entity | Name in API |
|----------|-------------|---------|
| Titel | `title` |
| Trupp | `unit` |
| Antreten | `start` |
| Abtreten | `end` |
| Mitnehmen | `bring_along` |
| Tenue | `uniform` |
| Bild | `picture` |
| Abmelden bis | `checkout_deadline` |
