Tageler API
===========

This project is archived, and no longer maintained.
---------------------------------------------------
It will be replaced with a django based project, that will be open sourced at some point.

Introduction
-----------
This project is the backend part of the Tageler app, which is created for [Pfadicorps Patria Bern](https://www.pfadipatria.ch/).
Its purpose is to provide the possibility to manage so-called 'tagelers', thus events for members of the Pfadicoprs Patria Bern.

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

Run Tests
----------
Run tests with
```npm test```
or
```bash ./node_modules/mocha/bin/mocha``` if in package.json the script
```bash
"scripts": {
    "test": "mocha"
  }
```
is missing

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
|[Angular 2.0 CLI](https://devcenter.heroku.com/articles/mean-apps-restful-api)|Create Frontend with Angular and talk to a REST Server|Angular 2.0|Balz|
|[Express](https://www.terlici.com/2014/08/25/best-practices-express-structure.html)|Express Best Practices|Express|Flurin|

Glossary
--------
| Entity | Name in API |
|--------|-------------|
| Titel | `title` |
| Trupp | `unit` |
| Antreten | `start` |
| Abtreten | `end` |
| Mitnehmen | `bringAlong` |
| Tenue | `uniform` |
| Bild | `picture` |
| Abmelden | `checkout` |
| Abmelden bis | `checkout.deadline` |
| Übungsfrei | `free` |


## Important files and directories
| File/Folder | Purpose |
|--------|-------------|
| src/ | Contains all models, routes and services. |
| src/app.js | Initializes the app and glues everything together. |
| src/server.js | Contains the port number and starts the server. |
| node_modules/ | The npm packages installed with the `npm install` command. |
| test/ | Contains the unit-tests. |
| .travis.yml | This file specifies the programming language used, the desired building and testing environment and various other parameters. |
| gulpfile.babel.js | Contains the gulp tasks. |
| package.json | Identifies npmpackage dependencies for the project. |


## License
Copyright © 2017 Pfadicorps Patria Bern

## Authors
#### Developers:
  * Ramona Beck
  * Balthasar Hofer
  * Kevin Meister
  * Sven Schmid
  * Artthik Sellathurai
  * Flurin Trübner

#### Contributors:
  * Lucas Bickel
  * Mathias Petermann
